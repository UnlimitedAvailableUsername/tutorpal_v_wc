from django.shortcuts import render
from django.contrib.auth import get_user_model
from . import models
from . import serializers

# for function-based views:
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

## for class-based views:
from rest_framework import generics
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
        '../products/',
        '../products/create/',
        '../products/upload/',
        '../products/<id>/reviews/',
        '../products/top/',
        '../products/<id>/',
        '../products/delete/<id>/',
        '../products/<update>/<id>',
    ]
    return Response(routes)

## For fetching all the products
# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def getProducts(request):
#     permissions = IsAuthenticated
#     products = models.Product.objects.all()
#     serializer = serializers.ProductSerializer(products, many=True)
#     return Response(serializer.data)

# class GetProducts(generics.GenericAPIView):
#     pass

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
# @api_view(['GET'])
# def getUser(request, pk):
#     user = User.objects.get(id=pk)
#     serializer = serializers.UserSerializer(user, many=False)
#     def get_queryset(self):
#         return super().get_queryset()
    
#     return Response(serializer.data)


@api_view(['GET'])
def getSubjects(request):
    subjects = models.Subject.objects.all()
    serializer = serializers.SubjectSerializer(subjects, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getSubject(request, pk):
    subject = models.Subject.objects.get(id=pk)
    serializer = serializers.SubjectSerializer(subject, many=False)
    return Response(serializer.data)



@api_view(['GET'])
def getUser(request, pk):
    user = User.objects.get(id=pk)
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

@api_view(["POST"])
def addProduct(request):
    data = request.data
    print (data)
    try:

        subject2 = models.Subject.objects.get(_id=data['subject'])
        product = models.Product.objects.create(
        lesson_name = data['lesson'],
        schedule = data['schedule'],
        rate_hour = data['rate'],
        subject = subject2,
        )
        serializer = serializers.ProductSerializer(product, many=False)
        return Response(serializer.data)
    except:
        message = {'detail': 'Test'}
        return Response(message)


class MyTokenObtainPairView(jwt_views.TokenObtainPairView):
    serializer_class = serializers.MyTokenObtainPairSerializer