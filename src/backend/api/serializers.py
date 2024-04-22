from rest_framework import serializers

from cryptocurrency.models import CryptoCurrency


class MarketSerializer(serializers.ModelSerializer):
    class Meta:
        model = CryptoCurrency
        fields = "__all__"
