from django.db import IntegrityError
from django.shortcuts import render
from django.contrib.auth import get_user_model
from accounts.models import *
from accounts.serializers import *
from rest_framework.response import Response
from rest_framework import status
from datetime import datetime
from django.contrib.auth.hashers import make_password
from rest_framework.views import (APIView, Response)
from rest_framework.authentication import TokenAuthentication

# for function-based views:
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

## for class-based views:
from rest_framework import generics
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


@api_view(['GET'])
def getProducts(request):
    products = models.Schedule.objects.all()
    serializer = ScheduleSerializer(products, many=True)
    return Response(serializer.data)


## For fetching specific product with id, pk
@api_view(['GET'])
def getProduct(request, pk):
    product = models.Schedule.objects.get(_id=pk)
    serializer = ScheduleSerializer(product, many=False)
    return Response(serializer.data)


# For fetching all the users
@api_view(['GET'])
# @permission_classes([IsAdminUser])
def getUsers(request):
    users = User.objects.all()
    serializer = UserSerializer(users,many = True)
    return Response(serializer.data)


@api_view(['GET'])
def getSubjects(request):
    subjects = Subject.objects.all()
    serializer = SubjectSerializer(subjects, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getSubject(request, pk):
    subject = Subject.objects.get(id=pk)
    serializer = SubjectSerializer(subject, many=False)
    return Response(serializer.data)


@api_view(['GET'])
def getUser(request, pk):
    user = User.objects.get(id=pk)
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)


# @api_view(['POST'])
# def register(request):
#     serializer = UserSerializer(data=request.data)
#     serializer.is_valid(raise_exception=True)
#     user = serializer.save()
#     token = AuthToken.objects.create(user)[1]
#     response_data = {
#         "user": UserSerializer(user, context=serializer.context).data,
#         "token": token
#     }
#     return Response(response_data)

#//PARTIAL 
class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            serializer_with_token = UserSerializerWithToken1(user, many=False)
            return Response(serializer_with_token.data, status=201)
        else:
            return Response(serializer.errors, status=400)
        




@api_view(['POST'])
@permission_classes([IsAuthenticated])
def uploadProfilePicture(request):
    image = request.FILES.get('image', None)
    if image is not None:
        # Do whatever you want to do with the image here
        # For example, save it to the user's profile picture field
        request.user.profile_picture = image
        request.user.save()
        return Response({'message': 'Image uploaded successfully!'})
    else:
        return Response({'error': 'No image provided.'})


# @api_view(['POST'])
# def user_token_obtain_pair_view(request):
#     serializer = UserSerializerWithToken(data=request.data)
#     serializer.is_valid(raise_exception=True)
#     data = serializer.validated_data
#     return Response(data)

# Rest Framework JWT 
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

# JWT Views
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
       
        serializer = UserSerializerWithToken1(self.user).data

        for k,v in serializer.items():
            data[k] =v

        return data
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        token['message'] = "Hello Proshop"
        # ... 

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer




# @api_view(['PUT', 'PATCH', 'GET'])
# @permission_classes([IsAuthenticated])
# def updateUserProfile(request):
#     user = request.user
#     data = request.data
#     user.email = data.get('email', user.email)
#     user.username = data.get('username', user.username)
#     user.first_name = data.get('first_name') or user.first_name
#     user.last_name = data.get('last_name') or user.last_name

#     if data.get('password'):
#         user.set_password(data['password'])
#     user.save()

#     serializer = UserSerializer(user, many=False)
#     return Response(serializer.data)






@api_view(["POST", "GET"])
def addProduct(request):
    data = request.data
    print (data)
    try:
        # user1 = request.data.user
        price_to_be_set = request.data.user.price
        subject2 = models.Subject.objects.get(_id=data['subject'])
        product = models.Schedule.objects.create(
        # user = user1,
        lesson_name = data['lesson'],
        schedule = data['schedule'],
        rate_hour = data['rate'],
        price = data['price_to_be_set'],
        subject = subject2,
        )
        serializer = SubjectSerializer(product, many=False)
        return Response(serializer.data)
    except:
        message = {'detail': 'Test'}
        return Response(message)



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addOrderItems(request):
    user = request.user
    data = request.data
    print(data)
    orderItems = data['orderItems']

    if orderItems and len(orderItems) == 0:
        return Response({'detail': 'No Order Items', "status": status.HTTP_400_BAD_REQUEST})
    else:
        # (1) Create Order
        order = CartSchedule.objects.create(
            user=user,
            paymentMethod=data['paymentMethod'],
            taxPrice=data['taxPrice'],
            shippingPrice=data['shippingPrice'],
            totalPrice=data['totalPrice'],
        )

        # (3) Create order items

        for i in orderItems:
            product = Schedule.objects.get(_id=i['product'])

            item = CartScheduleItem.objects.create(
                product=product,
                order=order,
                name=product.name,
                qty=i['qty'],
                price=i['price'],
                image=product.image.url,
            )

            # (4) Update Stock

            product.countInStock -= item.qty
            product.save()

        serializer = CartScheduleSerializer(order, many=False)
        return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMyOrders(request):
    user = request.user
    orders = user.order_set.all()
    serializer = CartScheduleSerializer(orders, many=True)
    return Response(serializer.data)


@api_view(['GET'])
# @permission_classes([IsAdminUser])
def getOrders(request):
    orders = CartSchedule.objects.all()
    serializer = CartScheduleSerializer(orders, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOrderById(request, pk):

    user = request.user

    try:
        order = CartSchedule.objects.get(_id=pk)
        if user.is_staff or order.user == user:
            serializer = CartScheduleSerializer(order, many=False)
            return Response(serializer.data)
        else:
            Response({'detail': 'Not Authorized  to view this order'},
                     status=status.HTTP_400_BAD_REQUEST)
    except:
        return Response({'detail': 'Order does not exist'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateOrderToPaid(request, pk):
    order = CartSchedule.objects.get(_id=pk)
    order.isPaid = True
    order.paidAt = datetime.now()
    order.save()
    return Response('Order was paid')

@permission_classes([IsAuthenticated])
@api_view(["POST", "GET"])
def addContact(request):
    data = request.data
    print (data)
    try:
        user = request.user
        user2 = request.user.first_name
        user3 = request.user.last_name
        print(user)
        contact = Contact.objects.create(
        email = user,
        first_name = user2,
        last_name = user3,
        concern = data['concern'],
        comment = data['comment'],
        )
        serializer = ContactSerializer(contact, many=False)
        return Response(serializer.data)
    except:
        message = {'detail': 'Test'}
        return Response(message)
    
@api_view(['GET'])
def getContacts(request):
    contacts = Contact.objects.all()
    serializer = ContactSerializer(contacts, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getContact(request, pk):
    contact = Contact.objects.get(id=pk)
    serializer = ContactSerializer(contact, many=False)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user =request.user 
    serializer = UserSerializer(user,many = False)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUserProfile(request):
    user = request.user 
    serializer = UserSerializerWithToken1(user, many=False)
    data = request.data
    user.first_name = data.get('first_name', user.first_name)
    user.last_name = data.get('last_name', user.last_name)
    user.bio = data.get('bio', user.bio)
    user.username = data.get('username', user.username)
    user.email = data.get('email', user.email)
    user.meeting_link = data.get('meeting_link', user.meeting_link)
    password = data.get('password')
    if password:
        user.set_password(password)
    user.save()
    return Response(serializer.data)
