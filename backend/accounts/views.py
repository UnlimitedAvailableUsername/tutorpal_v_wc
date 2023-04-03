from django.shortcuts import render
from django.contrib.auth import get_user_model

## FROM PYTHON IMPORTS
from datetime import datetime

# FROM REST FRAMEWORK IMPORTS
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import APIException
from rest_framework.permissions import IsAuthenticated, IsAdminUser

## FOR REST FRAMEWORK FUNCTION-BASED VIEWS:
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

## FOR REST FRAMEWORK CLASS-BASED VIEWS:
from rest_framework import generics

## SIMPLE JWT ##
from rest_framework_simplejwt import views as jwt_views 
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

## LOCAL IMPORTS ##
from accounts.models import *
from accounts.serializers import *

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
    subjects = models.Subject.objects.all()
    serializer = SubjectSerializer(subjects, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getSubject(request, pk):
    subject = models.Subject.objects.get(id=pk)
    serializer = SubjectSerializer(subject, many=False)
    return Response(serializer.data)


@api_view(['GET'])
def getUser(request, pk):
    user = User.objects.get(id=pk)
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)


@api_view(['POST'])
def registerUser(request):
    serializer = UserSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.save()
    return Response({
        "user": UserSerializer(user, context=serializer.context).data,
        "token": AuthToken.objects.create(user)[1]
    })


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


@api_view(['POST'])
def loginUser(request):
    serializer_class = MyTokenObtainPairSerializer
    token_obtain_pair = jwt_views.TokenObtainPairView.as_view(serializer_class=serializer_class)
    response = token_obtain_pair(request._request)
    return Response(response.data, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user = request.user 
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)



@api_view(['PUT', 'PATCH', 'GET'])
@permission_classes([IsAuthenticated])
def updateUserProfile(request):
    user = request.user
    data = request.data
    serializer = UserSerializerWithToken(user, many=False)

    user.first_name = data.get('first_name') or user.first_name
    user.last_name = data.get('last_name') or user.last_name
    user.bio = data.get('bio', user.bio)
    user.email = data.get('email', user.email)
    user.username = data.get('username', user.username)
    password = data.get('password')

    if password:
        user.set_password(password)
    user.save()

    return Response(serializer.data)



# Create a new Product
@api_view(['POST'])
@permission_classes([IsAdminUser])
def addProduct(request):
    user = request.user
    data = request.data
    product = Schedule.objects.create(
        user=user,
        date=data['date'],
        price=data['price'],
        count_in_stock_hour=data['count_in_stock_hour'],
    )

    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)



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
        order = OrderSchedule.objects.create(
            user=user,
            paymentMethod=data['paymentMethod'],
            taxPrice=data['taxPrice'],
            shippingPrice=data['shippingPrice'],
            totalPrice=data['totalPrice'],
        )

        # (3) Create order items

        for i in orderItems:
            product = Schedule.objects.get(_id=i['product'])

            item = OrderScheduleItem.objects.create(
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

        serializer = OrderScheduleSerializer(order, many=False)
        return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMyOrders(request):
    user = request.user
    orders = user.order_set.all()
    serializer = OrderScheduleSerializer(orders, many=True)
    return Response(serializer.data)


@api_view(['GET'])
# @permission_classes([IsAdminUser])
def getOrders(request):
    orders = OrderSchedule.objects.all()
    serializer = OrderScheduleSerializer(orders, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOrderById(request, pk):

    user = request.user

    try:
        order = OrderSchedule.objects.get(_id=pk)
        if user.is_staff or order.user == user:
            serializer = OrderScheduleSerializer(order, many=False)
            return Response(serializer.data)
        else:
            Response({'detail': 'Not Authorized  to view this order'},
                     status=status.HTTP_400_BAD_REQUEST)
    except:
        return Response({'detail': 'Order does not exist'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateOrderToPaid(request, pk):
    order = OrderSchedule.objects.get(_id=pk)
    order.isPaid = True
    order.paidAt = datetime.now()
    order.save()
    return Response('Order was paid')


# FOR CONTACT US 
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addContact(request):
    data = request.data
    user = request.user
    contact = Contact.objects.create(
        name=user,
        concern=data['concern'],
        comment=data['comment'],
    )
    serializer = ContactSerializer(contact)
    return Response(serializer.data)


@api_view(['GET'])
def getContacts(request):
    contacts = Contact.objects.all()
    serializer = ContactSerializer(contacts, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getContact(request, pk):
    contact = Contact.objects.get(id=pk)
    serializer = ContactSerializer(contact, many=False)
