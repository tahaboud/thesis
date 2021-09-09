from django.db import models
from preferences import models as pModels
from django.conf import settings

class Supplier(models.Model):
    full_name = models.CharField(max_length=50, blank=False, null=False)
    address = models.CharField(max_length=50, blank=False, null=False)
    phone_number = models.CharField(max_length=20, blank=False, null=False)
    email = models.EmailField(max_length=50, blank=True, null=False)
    comment = models.CharField(max_length=100, blank=True, null=True)
    date_added = models.DateTimeField(auto_now_add=True)
    last_updated = models.DateTimeField(auto_now=True)
    added_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    updated_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="+")

class Equipement(models.Model):
    code = models.CharField(max_length=10, unique=True, blank=False, null=False)
    localisation = models.ForeignKey(pModels.Localisation, on_delete=models.CASCADE, null=False, blank=False)
    supplier = models.ForeignKey(Supplier, on_delete=models.CASCADE)
    brand = models.CharField(max_length=100, blank=False, null=False)
    serial_number = models.CharField(max_length=100, blank=False, null=False)
    comment = models.CharField(max_length=200, blank=True, null=False)
    date_added = models.DateTimeField(auto_now_add=True)
    last_updated = models.DateTimeField(auto_now=True)
    added_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="+")
    updated_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="+")
    is_online = models.BooleanField(default=True,blank=False, null=False)

class TreeStructure(models.Model):
    name = models.CharField(max_length=50, blank=False, null=False)
    equipement = models.ForeignKey(Equipement, on_delete=models.CASCADE)

class Tools(models.Model):
    full_name = models.CharField(max_length=50, blank=False, null=False)
    number = models.IntegerField(blank=False, null=False)
    price = models.IntegerField(blank=False, null=False)
    shelf = models.ForeignKey(pModels.Stock, on_delete=models.CASCADE)
    supplier = models.ForeignKey(Supplier, on_delete=models.CASCADE)
    available = models.IntegerField(blank=True, null=True)
    comment = models.CharField(max_length=100, blank=False, null=False)
    date_added = models.DateTimeField(auto_now_add=True)
    last_updated = models.DateTimeField(auto_now=True)
    added_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="+")
    updated_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="+")

class WorkOrder(models.Model):
    equipement = models.ForeignKey(Equipement, on_delete=models.CASCADE)
    failed_piece = models.ManyToManyField(TreeStructure)
    repair_piece = models.ManyToManyField(Tools)
    is_down = models.BooleanField(blank=False, null=False)
    date_created = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    maintenance_start_time = models.DateTimeField(blank=False, null=False)
    maintenance_end_tieme = models.DateTimeField(blank=False, null=False)
    comment = models.CharField(max_length=100, blank=True, null=True)

