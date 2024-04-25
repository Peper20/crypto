from django.db import models
from django.contrib.auth import get_user_model

CryptoUser = get_user_model()


class UserProfile(models.Model):
    user = models.OneToOneField(CryptoUser, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    demo_balance = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=0.0,
    )

    def set_demo_balance(self, amount):
        self.demo_balance = amount
        self.save()
