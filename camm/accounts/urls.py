from django.urls import path
from .api import RegisterUserAPI, LoginAPI, RegisterUserAPI
from knox import views as knox_views


urlpatterns = [
    path("", RegisterUserAPI.as_view({"post": "create", "put": "update", "get": "retrieve"})),
    path("all/", RegisterUserAPI.as_view({"get": "list"})),
    path("login/", LoginAPI.as_view()),
    path("logout/", knox_views.LogoutView.as_view(), name="knox_logout"),
]