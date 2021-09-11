from django.urls import path
from .api import LocalisationAPI, StockAPI


urlpatterns = [
    path("stock/", StockAPI.as_view({"get": "retrieve", "post": "create"})),
    path("stock/<pk>/", StockAPI.as_view({"put": "update"})),
    path("localisation/", LocalisationAPI.as_view({"get": "retrieve", "post": "create"})),
    path("localisation/<pk>/", LocalisationAPI.as_view({"put": "update"})),
]