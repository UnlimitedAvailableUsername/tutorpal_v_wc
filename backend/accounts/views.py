from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from . import models
from . import serializers
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
#### knox ####
from knox.models import AuthToken
#### simple_jwt ####
from rest_framework_simplejwt import views as jwt_views 

User = get_user_model()

@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/products/',
        '/products/create/',
        '/products/upload/',
        '/products/<id>/reviews/',
        '/products/top/',
        '/products/<id>/',
        '/products/delete/<id>/',
        '/products/<update>/<id>',
    ]
    return Response(routes)

## For fetching all the products
@api_view(['GET'])
def getProducts(request):
    products = models.Product.objects.all()
    serializer = serializers.ProductSerializer(products, many=True)
    return Response(serializer.data)

## For fetching specific product with id, pk
@api_view(['GET'])
def getProduct(request, pk):
    product = models.Product.objects.get(_id=pk)
    serializer = serializers.ProductSerializer(product, many=False)
    return Response(serializer.data)


# For fetching all the users
@api_view(['GET'])
def getUsers(request):
    user = User.objects.all()
    serializer = serializers.UserSerializer(user, many=True)
    return Response(serializer.data)

# class GetUsers(generics.ListAPIView):
#     queryset = User


# For fetching specific user
@api_view(['GET'])
def getUser(request, pk):
    user = User.objects.get(id=pk)
    def get_queryset(self):
        return super().get_queryset()
    
    product = models.Product.objects.all(filter=id)
    serializer = serializers.UserSerializer(user, many=False)
    return Response(serializer.data)


class RegisterAPI(generics.GenericAPIView):
    serializer_class = serializers.UserSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
        "user": serializers.UserSerializer(user, context=self.get_serializer_context()).data,
        "token": AuthToken.objects.create(user)[1]
        })


class MyTokenObtainPairView(jwt_views.TokenObtainPairView):
    serializer_class = serializers.MyTokenObtainPairSerializer