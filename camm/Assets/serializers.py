from rest_framework import serializers
from .models import Supplier, Equipement,Tools, WorkOrder


class SupplierSerializer(serializers.ModelSerializer):

    class Meta:
        model = Supplier
        fields = ("id","full_name", "address", "phone_number", "email", "comment", "date_added", "last_updated", "created_by", "updated_by")
        read_only_fields = ("id", "date_added", "last_updated")
    
    def update(self, instance, validated_data):
        validated_data.pop("created_by", None)
        return super().update(instance, validated_data)

    def validate(self, validated_data):
        try:
            int(validated_data["phone_number"])
            return validated_data

        except ValueError:
            raise serializers.ValidationError({"phone_number": "phone number must be a number"})

class EquipementSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Equipement
        fields = ("id", "code", "localisation", "supplier", "brand", "serial_number", "comment", "date_added", "last_updated", "created_by", "updated_by")
        read_only_fields = ("id", "date_added", "last_updated")

    def update(self, instance, validated_data):
        validated_data.pop("created_by", None)
        return super().update(instance, validated_data)


class ToolsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Tools
        fields = ("id", "full_name", "number", "price", "shelf", "supplier", "comment", "date_added", "last_updated", "created_by", "updated_by")
        read_only_fields = ("id", "date_added", "last_updated")

    def update(self, instance, validated_data):
        validated_data.pop("created_by", None)
        return super().update(instance, validated_data)


class WorkOrderSerializer(serializers.ModelSerializer):

    class Meta:
        model = WorkOrder
        fields = ("id", "equipement", "failed_piece", "repair_piece", "date_created", "created_by", "maintenance_start_time", "maintenance_end_time", "comment")
        read_only_fields = ("id", "date_created")

    def update(self, instance, validated_data):
        validated_data.pop("created_by", None)
        return super().update(instance, validated_data)