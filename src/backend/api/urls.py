from django.urls import path, include, re_path
from django.views.generic import TemplateView
from rest_framework import routers

from .views import (
    MarketViewSet,
    SignupView,
    GetCSRFToken,
    LogoutView,
    CheckAuthenticatedView,
    LoginView,
)

router_v1 = routers.DefaultRouter()
router_v1.register(r"market", MarketViewSet, basename="markets")

urlpatterns = [
    path("authenticated/", CheckAuthenticatedView.as_view()),
    path("register/", SignupView.as_view()),
    path("csrf_cookie/", GetCSRFToken.as_view()),
    path("logout/", LogoutView.as_view()),
    path("login/", LoginView.as_view()),
    path("", include(router_v1.urls)),
]

urlpatterns += [
    re_path(r"^.*", TemplateView.as_view(template_name="index.html")),
]
