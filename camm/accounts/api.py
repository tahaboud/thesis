from rest_framework import serializers, viewsets, status, generics, permissions
from rest_framework.response import Response
from knox.models import AuthToken
from .serializers import RegisterUserSerializer, LoginSerializer, UserSerializer

class IsAdminOrNoCreate(permissions.BasePermission):

    def has_permission(self, request, view):
        if view.action == "create":
            return request.user.is_admin
        return request.user.is_authenticated


class RegisterUserAPI(viewsets.ModelViewSet):
    serializer_class = RegisterUserSerializer
    permission_classes = [IsAdminOrNoCreate]

    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({"data": "User created succesfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request):
        current_user = request.user
        serializer = UserSerializer(current_user, data=request.data, partial=True)
        if serializer.is_valid():
            user = serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })