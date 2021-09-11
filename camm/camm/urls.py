from django.contrib import admin
from django.urls import path
from django.urls.conf import include

urlpatterns = [
    path('admin/', admin.site.urls),
    path("", include("frontend.urls")),
    path("api/assets/", include("Assets.urls")),
    path("api/preferences/", include("preferences.urls")),
    path("api/accounts/", include("accounts.urls"))
]
