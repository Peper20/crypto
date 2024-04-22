from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from .forms import UserRegistrationForm


def login_view(request):
    if request.method == "POST":
        email = request.POST.get("email")
        password = request.POST.get("password")
        user = authenticate(email=email, password=password)
        if user is not None:
            login(request, user)
            return redirect("#")
        else:
            return render(
                request,
                "users/login.html",
                {"error": "Неправильные данные"},
            )
    return render(request, "users/login.html")


def register_view(request):
    if request.method == "POST":
        form = UserRegistrationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect("users:login")
    else:
        form = UserRegistrationForm()
    return render(request, "users/register.html", {"form": form})


def logout_view(request):
    logout(request)
    return redirect("login")
