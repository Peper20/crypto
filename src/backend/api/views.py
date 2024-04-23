from django.contrib.auth import get_user_model
from django.contrib import auth
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect
from django.utils.decorators import method_decorator

from rest_framework.response import Response
from rest_framework import viewsets, permissions
from rest_framework.views import APIView

from cryptocurrency.models import CryptoCurrency
from users.models import UserProfile
from .serializers import MarketSerializer

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


class MarketViewSet(viewsets.ModelViewSet):
    serializer_class = MarketSerializer
    queryset = CryptoCurrency.objects.all()
