from rest_framework import viewsets
from django.contrib.auth import authenticate
from django.middleware import csrf
from django.conf import settings
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken

from cryptocurrency.models import CryptoCurrency
from .serializers import MarketSerializer


def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        "refresh": str(refresh),
        "access": str(refresh.access_token),
    }


class LoginView(APIView):

    def post(self, request, format=None):
        data = request.data
        response = Response()
        username = data.get("username", None)
        password = data.get("password", None)
        user = authenticate(username=username, password=password)
        if user is not None:
            if user.is_active:
                data = get_tokens_for_user(user)
                response.set_cookie(
                    key=settings.SIMPLE_JWT["AUTH_COOKIE"],
                    value=data["access"],
                    expires=settings.SIMPLE_JWT["ACCESS_TOKEN_LIFETIME"],
                    secure=settings.SIMPLE_JWT["AUTH_COOKIE_SECURE"],
                    httponly=settings.SIMPLE_JWT["AUTH_COOKIE_HTTP_ONLY"],
                    samesite=settings.SIMPLE_JWT["AUTH_COOKIE_SAMESITE"])
                csrf.get_token(request)
                email_template = render_to_string("login_success.html",
                                                  {"username": user.username})
                login = EmailMultiAlternatives(
                    "Successfully Login",
                    "Successfully Login",
                    settings.EMAIL_HOST_USER,
                    [user.email],
                )
                login.attach_alternative(email_template, "text/html")
                login.send()
                response.data = {"Success": "Login successfully", "data": data}

                return response
            else:
                return Response({"No active": "This account is not active!!"},
                                status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({"Invalid": "Invalid username or password!!"},
                            status=status.HTTP_404_NOT_FOUND)


class MarketViewSet(viewsets.ModelViewSet):
    serializer_class = MarketSerializer
    queryset = CryptoCurrency.objects.all()
