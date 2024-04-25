from django.urls import path, include
from rest_framework import routers

from .views import (
    MarketViewSet,
    SignupView,
    GetCSRFToken,
    LogoutView,
    CheckAuthenticatedView,
    LoginView,
    GetUsersView,
    UserProfileView,
)

router_v1 = routers.DefaultRouter()

urlpatterns = [
    path("authenticated/", CheckAuthenticatedView.as_view()),
    path("register/", SignupView.as_view()),
    path("csrf_cookie/", GetCSRFToken.as_view()),
    path("logout/", LogoutView.as_view()),
    path("login/", LoginView.as_view()),
    path("users/", GetUsersView.as_view()),
    path("my/", UserProfileView.as_view()),
    path(
        "market/list/",
        MarketViewSet.as_view({"get": "list"}),
        name="market-list",
    ),
    path(
        "market/buy/<int:pk>/",
        MarketViewSet.as_view({"post": "buy_crypto"}),
        name="market-buy",
    ),
    path("", include(router_v1.urls)),
]
