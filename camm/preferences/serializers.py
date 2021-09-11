from rest_framework import serializers
from .models import Stock, Localisation


class StockSerializer(serializers.ModelSerializer):

    class Meta:
        model = Stock
        fields = ("id", "name",)


class LocalisationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Localisation
        fields = ("id", "name",)
