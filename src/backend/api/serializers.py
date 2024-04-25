from django.contrib.auth import get_user_model

from rest_framework import serializers

from cryptocurrency.models import CryptoCurrency
from users.models import UserProfile

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "username",
        ]


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ["user", "first_name", "last_name", "demo_balance"]


class MarketSerializer(serializers.ModelSerializer):
    class Meta:
        model = CryptoCurrency
        fields = "__all__"
        lookup_field = 'slug'
        extra_kwargs = {
            'url': {'lookup_field': 'slug'}
        }
