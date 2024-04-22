from django.db import models
from django.contrib.auth.models import AbstractUser


class CryptoUser(AbstractUser):
    email = models.EmailField(
        "Электронная почта",
        max_length=255,
        unique=True,
    )
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    demo_balance = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=0.0,
    )
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = [
        email,
        first_name,
        last_name,
    ]

    def set_demo_balance(self, amount):
        self.demo_balance = amount
        self.save()

    class Meta:
        verbose_name = "Пользователь"
        verbose_name_plural = "Пользователи"
        ordering = ("username", )

    def __str__(self):
        return f"User: {self.username} ; {self.email}"
