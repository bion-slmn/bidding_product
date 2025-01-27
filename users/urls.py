from django.urls import path
from .views import CreateAdmin, CreateUser

urlpatterns = [
    path('create-admin/', CreateAdmin.as_view(), name='create_admin'),
    path('create-user/', CreateUser.as_view(), name='create_user'),
]
