from django.db import models

class Stock(models.Model):
    name = models.CharField(max_length=50, blank=False, null=False)

class Localisation(models.Model):
    name = models.CharField(max_length=50, blank=False, null=False)