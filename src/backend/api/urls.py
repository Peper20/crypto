from django.urls import path, include
from rest_framework import routers

from .views import MarketViewSet, LoginView


router_v1 = routers.DefaultRouter()
router_v1.register("market", MarketViewSet, basename="markets")

urlpatterns = [
    path("login/", LoginView.as_view(), name="login"),
    path("api", include(router_v1.urls)),
]
