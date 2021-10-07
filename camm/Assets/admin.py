from django.contrib import admin
from .models import Supplier, Equipement, Tools, WorkOrder

# Register your models here.
admin.site.register(Supplier)
admin.site.register(Equipement)
admin.site.register(Tools)
admin.site.register(WorkOrder)