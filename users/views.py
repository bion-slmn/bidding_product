from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .seriailizer import UserSerializer
from rest_framework.permissions import AllowAny


class CreateAdmin(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            # Create admin user
            user = serializer.save()
            user.is_staff = True
            user.is_superuser = True
            user.save()
            return Response({"message": "Admin user created successfully."}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CreateUser(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({"message": "User created successfully."}, status=status.HTTP_201_CREATED)
