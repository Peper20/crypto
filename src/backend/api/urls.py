from django.urls import path, include
from rest_framework import routers


routers_v1 = routers.DefaultRouter()

urlpatterns = [
    path("", include("users.urls")),
]
