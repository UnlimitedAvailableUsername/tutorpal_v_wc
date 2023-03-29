from django.shortcuts import render
from django.contrib.auth import get_user_model
from accounts.models import *
from accounts.serializers import *
from rest_framework.response import Response
from rest_framework import status
from datetime import datetime

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
    serializer = serializers.ScheduleSerializer(products, many=True)
    return Response(serializer.data)


## For fetching specific product with id, pk
@api_view(['GET'])
def getProduct(request, pk):
    product = models.Schedule.objects.get(_id=pk)
    serializer = serializers.ScheduleSerializer(product, many=False)
    return Response(serializer.data)


# For fetching all the users
@api_view(['GET'])
def getUsers(request):
    user = User.objects.all()
    serializer = serializers.UserSerializer(user, many=True)
    return Response(serializer.data)


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


@api_view(['POST'])
def register(request):
    serializer = serializers.UserSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.save()
    return Response({
        "user": serializers.UserSerializer(user, context=serializer.context).data,
        "token": AuthToken.objects.create(user)[1]
    })


@api_view(['POST'])
def upload_profile_picture(request):
    file = request.data.get('profile_picture')
    if not file:
        return Response({'error': 'No file uploaded'}, status=status.HTTP_400_BAD_REQUEST)
    # TODO: Save the file to the user's profile_picture field
    return Response({'success': 'File uploaded'}, status=status.HTTP_201_CREATED)


@api_view(['POST'])
def user_token_obtain_pair_view(request):
    serializer = serializers.UserSerializerWithToken(data=request.data)
    serializer.is_valid(raise_exception=True)
    data = serializer.validated_data
    return Response(data)


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
        serializer = serializers.ProductSerializer(product, many=False)
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