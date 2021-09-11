from django.urls import path
from .api import SupplierAPI, EquipementAPI, ToolsAPI, WorkOrderAPI, TreeStructureAPI


urlpatterns = [
    path("supplier/", SupplierAPI.as_view({"post": "create", "get": "retrieve"})),
    path("supplier/<pk>/", SupplierAPI.as_view({"put": "update"})),
    path("equipement/", EquipementAPI.as_view({"post": "create", "get": "retrieve"})),
    path("equipement/<pk>/", EquipementAPI.as_view({"put": "update"})),
    path("tools/", ToolsAPI.as_view({"post": "create", "get": "retrieve"})),
    path("tools/<pk>/", ToolsAPI.as_view({"put": "update"})),
    path("workorder/", WorkOrderAPI.as_view({"post": "create", "get": "retrieve"})),
    path("workorder/<pk>/", WorkOrderAPI.as_view({"put": "update"})),
    path("tree/", TreeStructureAPI.as_view({"post": "create"})),
    path("tree/<pk>/", TreeStructureAPI.as_view({"put": "update", "get": "retrieve"})),
]