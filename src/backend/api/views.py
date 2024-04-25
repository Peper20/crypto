import requests
from decimal import Decimal

from django.contrib.auth import get_user_model
from django.contrib import auth
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect
from django.utils.decorators import method_decorator

from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import viewsets, permissions, status
from rest_framework.views import APIView

from cryptocurrency.models import CryptoCurrency, Portfolio, PortfolioCrypto
from users.models import UserProfile
from .serializers import MarketSerializer, UserSerializer, UserProfileSerializer
from .utils import get_crypto_info_by_symbol

User = get_user_model()


@method_decorator(csrf_protect, name="dispatch")
class CheckAuthenticatedView(APIView):

    def get(self, request, format=None):
        isAuthenticated = User.is_authenticated

        if isAuthenticated:
            return Response({"isAuthenticated": "success"})
        else:
            return Response({"isAuthenticated": "error"})


@method_decorator(csrf_protect, name="dispatch")
class SignupView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        data = self.request.data

        password = data["password"]
        username = data["username"]
        re_password = data["re_password"]

        if password != re_password:
            return Response({"error": "Пароли не совпадают"})
        if User.objects.filter(username=username).exists():
            return Response({"error": "Такой пользователь уже существует"})
        user = User.objects.create_user(
            password=password,
            username=username,
        )
        user.save()

        user = User.objects.get(username=username)
        user_profile = UserProfile(
            user=user,
            first_name="",
            last_name="",
            demo_balance=0,
        )
        user_profile.save()
        return Response({"success": "Пользователь успешно создан"})


@method_decorator(csrf_protect, name="dispatch")
class LoginView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        data = self.request.data

        username = data["username"]
        password = data["password"]
        user = auth.authenticate(
            username=username,
            password=password,
        )

        if user is not None:
            auth.login(request, user)
            return Response(
                {
                    "success": "Пользователь аутентифицирован",
                    "username": username,
                },
            )
        else:
            return Response({"error": "Ошибка аутентификации"})


class LogoutView(APIView):

    def post(self, request, format=None):
        try:
            auth.logout(request)
            return Response({"success": "Пользователь успешно разлогинен"})
        except Exception:
            return Response({"error": "Ошибка во время выхода"})


@method_decorator(ensure_csrf_cookie, name="dispatch")
class GetCSRFToken(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, format=None):
        return Response({"success": "CSRF cookie установлен"})


class GetUsersView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, format=None):
        users = User.objects.all()

        users = UserSerializer(users, many=True)
        return Response(users.data)


class UserProfileView(APIView):
    def get(self, request, format=None):
        user = self.request.user
        username = user.username

        user = User.objects.get(id=user.id)

        user_profile = UserProfile.objects.get(user=user)
        user_profile = UserProfileSerializer(user_profile)

        return Response(
            {
                "profile": user_profile.data,
                "username": str(username),
            }
        )

    def put(self, request, format=None):
        user = self.request.user
        username = user.username

        data = request.data
        first_name = data["first_name"]
        last_name = data["last_name"]
        demo_balance = data["demo_balance"]

        user = User.objects.get(id=user.id)

        UserProfile.objects.filter(user=user).update(
            first_name=first_name,
            last_name=last_name,
            demo_balance=demo_balance,
        )

        user_profile = UserProfile.objects.get(user=user)
        user_profile = UserProfileSerializer(user_profile)

        return Response(
            {
                "profile": user_profile.data,
                "username": str(username),
            }
        )


class MarketViewSet(viewsets.ModelViewSet):
    serializer_class = MarketSerializer
    queryset = CryptoCurrency.objects.all()
    lookup_field = "slug"

    def list(self, request):
        url = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest"
        headers = {
            "X-CMC_PRO_API_KEY": "6df46815-fbaa-4152-8f1a-4ef7996ccfbe",
        }
        response = requests.get(url, headers=headers)

        if response.status_code == 200:
            data = response.json()
            cryptocurrencies = data["data"]
            return Response(cryptocurrencies)
        else:
            return Response(
                {"error": "Ошибка получения списка криптовалют"},
                status=response.status_code,
            )

    def buy_crypto(self, request, pk):
        price, symbol, name = get_crypto_info_by_symbol(pk - 1)
        price = int(Decimal(price))

        if price:
            amount = request.data.get("amount", 0)

            user = self.request.user
            user = User.objects.get(id=user.id)
            user_profile = UserProfile.objects.get(user=user)
            demo_balance = int(user_profile.demo_balance)

            total_price = price * int(amount)

            if total_price <= demo_balance:
                if Portfolio.objects.filter(user=user).exists():
                    portfolio = Portfolio.objects.get(user=user)
                    portfolio.total_amount += amount
                    portfolio.total_price += total_price
                    if CryptoCurrency.objects.filter(symbol=symbol).exists():
                        crypto = CryptoCurrency.objects.get(symbol=symbol)
                    else:
                        crypto = CryptoCurrency.objects.create(
                            symbol=symbol,
                            name=name,
                            price=price,
                            amount=int(amount),
                        )
                    PortfolioCrypto.objects.create(
                        portfolio=portfolio,
                        crypto=crypto,
                    )
                else:
                    portfolio = Portfolio.objects.create(
                        user=user,
                        total_amount=amount,
                        total_price=total_price,
                    )

                user_profile.demo_balance -= total_price
                user_profile.save()

                return Response(
                    {
                        "message": f"Криптовалюта {symbol} успешно куплена "
                        f"в количестве {amount} и добавлена в ваш портфель"
                    },
                    status=status.HTTP_200_OK,
                )
            else:
                return Response(
                    {"error": "Недостаточно средств для покупки криптовалюты"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
        else:
            return Response(
                {"error": f"Криптовалюта с сокращением {symbol} не найдена"},
                status=status.HTTP_404_NOT_FOUND,
            )
