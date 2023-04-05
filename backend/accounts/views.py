## FROM DJANGO
from django.shortcuts import render
from django.contrib.auth import get_user_model
from django.http import JsonResponse

## FROM PYTHON IMPORTS
from datetime import datetime
import json

## FROM REST FRAMEWORK IMPORTS
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import APIException
from rest_framework.permissions import IsAuthenticated, IsAdminUser

## CREATED A CUSTOM PERMISSION FOR TUTOR ONLY
from rest_framework.permissions import BasePermission

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


############################
####    FOR SUBJECTS    ####
####                    ####


@api_view(['GET', 'POST'])
def getSubjects(request):
    if request.method == 'GET':
        subjects = Subject.objects.all()
        serializer = SubjectSerializer(subjects, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    elif request.method == 'POST':
        serializer = SubjectSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)


@api_view(['GET'])
def getSubject(request, pk):
    try:
        subject = Subject.objects.get(id=pk)
    except models.Subject.DoesNotExist:
        return Response({'error': 'Subject does not exist'}, status=status.HTTP_404_NOT_FOUND)
    
    serializer = SubjectSerializer(subject, many=False)
    return Response(serializer.data, status=status.HTTP_200_OK)


#####    END SUBJECTS    #####
##############################


#########################        
#####   FOR USERS   #####
#####               #####


@api_view(['GET'])
# @permission_classes([IsAdminUser])
def getUsers(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
def getTutorUsers(request):
    users = User.objects.filter(tutor=True, active=True)
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
def getUser(request, pk):
    try:
        user = User.objects.get(id=pk)
    except User.DoesNotExist:
        return Response({"error": "User does not exist."}, status=status.HTTP_404_NOT_FOUND)
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['POST'])
def loginUser(request):
    serializer_class = MyTokenObtainPairSerializer
    token_obtain_pair = jwt_views.TokenObtainPairView.as_view(serializer_class=serializer_class)
    response = token_obtain_pair(request._request)
    if response.status_code == status.HTTP_200_OK:
        return Response(response.data, status=status.HTTP_200_OK)
    return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)


@api_view(['POST'])
def registerUser(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        token = RefreshToken.for_user(user)
        response_data = {
            "email": user.email,
            "username": user.username,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "profile_picture": str(user.profile_picture), # Convert ImageFieldFile to string
            "contact": user.contact,
            "bio": user.bio,
            "active": user.active,
            "staff": user.staff,
            "student": user.student,
            "tutor": user.tutor,
            "subjects": serializer.data.get("subjects", []),
            "numReviews": user.numReviews,
            "meeting_link": user.meeting_link,
            "price_rate_hour": user.price_rate_hour,
            "token": str(token.access_token)
        }
        response = JsonResponse(response_data, content_type="application/json")
        response.status_code = status.HTTP_201_CREATED
        return response
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def uploadProfilePicture(request):
    image = request.FILES.get('image', None)
    if image is not None:
        # Do whatever you want to do with the image here
        # For example, save it to the user's profile picture field
        request.user.profile_picture = image
        request.user.save()
        return Response({'message': 'Image uploaded successfully!'}, status=status.HTTP_200_OK)
    else:
        return Response({'error': 'No image provided.'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user = request.user 
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)


@api_view(['PUT', 'PATCH'])
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

    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
def getUsersBySubject(request, subject_id):
    try:
        subject = Subject.objects.get(_id=subject_id)
        users = subject.users.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)
    except Subject.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)


####    END USERS   ####
########################


####################################
####    FOR SCHEDULES OF TUTORS ####
####                            ####


class IsTutorUser(BasePermission):
    def has_permission(self, request, view):
        user = request.user
        return user.is_authenticated and user.is_tutor
    

@api_view(['POST'])
@permission_classes([IsTutorUser])
def addSchedule(request):
    user = request.user
    data = request.data
    product = Schedule.objects.create(
        user=user,
        date=data['date'],
        price=data['price'],
        count_in_stock_hour=data['count_in_stock_hour'],
    )

    serializer = ScheduleSerializer(product, many=False)
    return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET'])
def getScheduleOfTutor(request, pk):
    try:
        schedule = Schedule.objects.filter(user__pk=pk)

    except Schedule.DoesNotExist:
        message = {"detail": "User does not have any schedule"}
        return Response(message, status=status.HTTP_404_NOT_FOUND)
    
    serializer = ScheduleSerializer(schedule, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMyOwnSchedules(request, user_id):
    user = request.user
    schedules = Schedule.objects.filter(user=user)
    serializer = ScheduleSerializer(schedules, many=True)
    return Response(serializer.data)



########################
####    FOR ORDERS  ####



class IsStudentUser(BasePermission):
    def has_permission(self, request, view):
        user = request.user
        return user.is_authenticated and user.is_student
   

@api_view(['POST'])
@permission_classes([IsStudentUser])
def addOrderItems(request):
    user = request.user
    data = request.data
    orderItems = data['orderItems']

    if orderItems and len(orderItems) == 0:
        return Response({'detail': 'No Order Items', "status": status.HTTP_400_BAD_REQUEST})
    else:
        # (1) Create Order
        order = OrderSchedule.objects.create(
            user=user,
            payment_method=data['payment_method'],
            tax_price=data['tax_price'],
            total_price=data['total_price'],
        )

        # (3) Create order items

        for instance in orderItems:
            schedule = Schedule.objects.get(_id=instance['schedule'])

            item = OrderScheduleItem.objects.create(
                schedule=schedule,
                order=order,
                name=schedule.name,
                qty=instance['qty'],
                price=instance['price'],
                image=schedule.image,
            )

            # (4) Update Stock

            schedule.countInStock -= item.qty
            schedule.save()

        serializer = OrderScheduleSerializer(order, many=False)
        return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMyOrders(request):
    user = request.user
    orders = user.order_set.all()
    serializer = OrderScheduleSerializer(orders, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
# @permission_classes([IsAdminUser])
def getOrders(request):
    orders = OrderSchedule.objects.all()
    serializer = OrderScheduleSerializer(orders, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


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
            Response({'detail': 'Not Authorized to view this order'},
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
    return Response({'message': f'Order {pk} was paid.'}, status=status.HTTP_200_OK)




#### FOR CONTACT US ####

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
    return Response(serializer.data, status=status.HTTP_200_OK)
