from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class CryptoCurrency(models.Model):
    name = models.CharField(max_length=100)
    symbol = models.CharField(max_length=10)
    current_price = models.DecimalField(max_digits=10, decimal_places=2)
    market_cap = models.DecimalField(max_digits=20, decimal_places=2)
    volume_24h = models.DecimalField(max_digits=20, decimal_places=2)
    total_capital = models.DecimalField(max_digits=20, decimal_places=2)


class TradingPair(models.Model):
    name = models.CharField(max_length=50)
    base_currency = models.CharField(max_length=10)
    quote_currency = models.CharField(max_length=10)
    current_price = models.DecimalField(max_digits=10, decimal_places=2)
    volume = models.DecimalField(max_digits=10, decimal_places=2)
    last_updated = models.DateTimeField(auto_now=True)


class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    trading_pair = models.ForeignKey(TradingPair, on_delete=models.CASCADE)
    order_type = models.CharField(max_length=10)
    volume = models.DecimalField(max_digits=10, decimal_places=2)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=10)
    created_at = models.DateTimeField(auto_now_add=True)


class TradeHistory(models.Model):
    trading_pair = models.ForeignKey(
        TradingPair,
        on_delete=models.CASCADE,
    )
    buyer = models.ForeignKey(
        User,
        related_name="buyer",
        on_delete=models.CASCADE,
    )
    seller = models.ForeignKey(
        User,
        related_name="seller",
        on_delete=models.CASCADE,
    )
    volume = models.DecimalField(max_digits=10, decimal_places=2)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    traded_at = models.DateTimeField(auto_now_add=True)
