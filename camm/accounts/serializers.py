from rest_framework import serializers
from .models import Account
from django.contrib.auth import authenticate


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ("id", "username", "email",
                  "is_admin", "first_name", "last_name")
        read_only_fields = (
            "id",  "is_admin",)


class RegisterUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = Account
        fields = ("first_name", "last_name", "email", "password")
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = Account.objects.create_user(
            validated_data["first_name"], validated_data["last_name"], validated_data["email"], validated_data["password"])

        return user


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect Credentials")