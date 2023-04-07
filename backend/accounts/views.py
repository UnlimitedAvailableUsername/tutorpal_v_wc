## FROM DJANGO
from django.contrib.auth import get_user_model, authenticate
from django.contrib.auth.hashers import make_password

## FROM REST FRAMEWORK IMPORTS
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import APIException
from rest_framework.permissions import IsAuthenticated, IsAdminUser

## FOR REST FRAMEWORK FUNCTION-BASED VIEWS:
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

## LOCAL IMPORTS ##
from accounts.models import *
from accounts.serializers import *

User = get_user_model()


############################
####    FOR SUBJECTS    ####
####                    ####

#############################################################
# THIS CAN LIST ALL SUBJECTS AVAILABLE AND ALSO ADD A NEW ONE 

@api_view(['GET', 'POST'])
def subject_list(request):
    if request.method == 'GET':
        subjects = Subject.objects.all()
        serializer = SubjectSerializer(subjects, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    elif request.method == 'POST':
        data = request.data
        serializer = SubjectSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

###################################################################################
# THIS WILL LIST THE SPECIFIC SUBJECT <id> AND BE ABLE TO MAKE MODIFIICATIONS TO IT

@api_view(['GET', 'PUT', 'PATCH', 'DELETE'])
def subject_detail(request, id):
    try:
        subject = Subject.objects.get(id=id)
    except models.Subject.DoesNotExist:
        return Response({'error': 'Subject does not exist'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = SubjectSerializer(subject)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    elif request.method == 'PUT':
        serializer = SubjectSerializer(subject, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'PATCH':
        serializer = SubjectSerializer(subject, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        subject.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

###########################################################
# THIS WILL LIST ALL USERS THAT HAS A SPECIFIC SUBJECT <id>

@api_view(['GET'])
def subject_list_users(request, id):
    try:
        subject = Subject.objects.get(id=id)
        users = subject.users.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)
    except Subject.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

#####    END SUBJECTS    #####
##############################



#########################        
#####   FOR USERS   #####
#####               #####

###############################################
# THIS WILL LIST ALL USERS, FOR ADMIN EYES ONLY

@api_view(['GET'])
@permission_classes([IsAdminUser])
def users_list(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

###########################
# THIS WILL LIST ALL TUTORS

@api_view(['GET'])
def users_tutor_list(request):
    users = User.objects.filter(tutor=True, active=True)
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

##################################################
# THIS WILL LIST ALL STUDENTS, FOR ADMIN EYES ONLY

@api_view(['GET'])
@permission_classes([IsAdminUser])
def users_student_list(request):
    users = User.objects.filter(student=True)
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

#######################################
# THIS WILL CALL THE SPECIFIC USER <id>

@api_view(['GET'])
def user_detail(request, id):
    try:
        user = User.objects.get(id=id)
    except User.DoesNotExist:
        return Response({"error": "User does not exist."}, status=status.HTTP_404_NOT_FOUND)
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data, status=status.HTTP_200_OK)

################################################################################
# THIS WILL LET THE USER LOGIN AND RETURN 'ACCESS' AS 'TOKEN' AND 'REFRESH' KEYS

@api_view(['POST'])
def user_login(request):
    email = request.data.get('email', None)
    password = request.data.get('password', None)

    user = authenticate(email=email, password=password)

    if user is None:
        return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

    serializer = UserSerializerWithToken(user)
    response_data = serializer.data

    response_data['token'] = serializer.get_token(user)
    response_data['refresh'] = serializer.get_refresh(user)

    return Response(response_data, status=status.HTTP_200_OK)

#######################################################################################
# THIS WILL LET THE USERS REGISTER AND RETURN AN 'ACCESS' AS 'TOKEN' AND 'REFRESH' KEYS

@api_view(['POST'])
def user_register(request):
    data = request.data
    subjects_data = data.pop('subjects', [])
    password = data.pop('password')
    hashed_password = make_password(password)
    data['password'] = hashed_password
    serializer = UserSerializer(data=data)
    if serializer.is_valid():
        user = serializer.save()
        for subject in subjects_data:
            user.subjects.add(subject)
        serializer_with_token = UserSerializerWithToken(user)
        response_data = serializer_with_token.data
        response_data['token'] = serializer_with_token.get_token(user)
        response_data['refresh'] = serializer_with_token.get_refresh(user)
        return Response(response_data, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#########################################################################################
# THIS WILL LET THE CURRENT USER VIEW ('GET') AND UPDATE ('PUT') HIS/HER PROFILE
# NOTE: USE 'Content-Type': 'multipart/form-data' FOR 'headers' WHEN DOING UPDATE ('PUT')

import os
import tempfile

def handle_uploaded_file(f):
    with tempfile.NamedTemporaryFile(delete=False) as tmpfile:
        for chunk in f.chunks():
            tmpfile.write(chunk)
    return tmpfile.name

@api_view(['GET', 'PUT'])
def user_profile(request):
    user = request.user
    if request.method == 'GET':
        serializer = UserSerializerWithToken(user)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = UserSerializerWithToken(user, data=request.data, partial=True)
        if serializer.is_valid():
            profile_picture = request.FILES.get('profile_picture')
            if profile_picture:
                image_path = handle_uploaded_file(profile_picture)
                # Update the user profile with the image file path
                user.profile_picture = image_path
            if 'password' in request.data:
                serializer.validated_data['password'] = make_password(request.data['password'])
            user.save()
            serializer.save()
            Schedule.objects.filter(owner=user).update(price=user.price_rate_hour)
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

####    END USERS   ####
########################



############################
####    FOR SCHEDULES   ####
####                    ####

#####################################################
# THIS WILL LIST ALL SCHEDULES OF SPECIFIC TUTOR <id>

@api_view(['GET'])
def schedule_list_of_tutor(request, id):
    try:
        schedule = Schedule.objects.filter(owner__pk=id)

    except Schedule.DoesNotExist:
        message = {"detail": "User does not have any schedule"}
        return Response(message, status=status.HTTP_404_NOT_FOUND)
    
    serializer = ScheduleSerializer(schedule, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

#################################
# THIS WILL DISPLAY ALL SCHEDULES

@api_view(['GET'])
def schedule_list(request):
    schedule = Schedule.objects.all()
    serializer = ScheduleSerializer(schedule, many=True)
    return Response(serializer.data)

###########################################################
# THIS WILL LIST THE SCHEDULES OF THE CURRENT TUTOR OR USER

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def my_schedule_list(request):
    user = request.user
    schedules = Schedule.objects.filter(owner=user)
    serializer = ScheduleSerializer(schedules, many=True)
    return Response(serializer.data)

##################################################
# THIS WILL CREATE A SCHEDULE FOR THE CURRENT USER

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def schedule_create(request):
    data = request.data
    user = request.user
    data['price'] = user.price_rate_hour  # set the price to the user's price_rate_hour
    schedule = Schedule.objects.create(owner=user, **data)
    serializer = ScheduleSerializer(schedule)
    return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def schedule_detail(request, id):
    try:
        schedule = Schedule.objects.get(id=id)
    except Schedule.DoesNotExist:
        return Response({"error": "Schedule does not exist"}, status=status.HTTP_404_NOT_FOUND)

    # Only allow the owner or admin user to modify the schedule
    if not request.user.is_staff and schedule.owner != request.user:
        return Response({"error": "You do not have permission to modify this schedule"}, status=status.HTTP_403_FORBIDDEN)

    if request.method == 'GET':
        serializer = ScheduleSerializer(schedule)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = ScheduleSerializer(schedule, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        schedule.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

####    END SCHEDULES    ####
#############################



########################
####    FOR ORDERS  ####

####################################
# THIS WILL CREATE/PLACE A NEW ORDER

@api_view(['POST'])
def schedule_order_create(request):
    items_data = request.data.get('items', [])
    total_amount = 0
    for item_data in items_data:
        schedule_id = item_data['schedule']
        schedule = Schedule.objects.get(id=schedule_id)
        quantity = item_data['quantity']
        item_total = schedule.price * quantity
        total_amount += item_total
        schedule.reduce_stock(quantity)
    paid_status = request.data.get('paid_status', False)
    payment_method = request.data.get('payment_method', None)
    schedule_order = ScheduleOrder.objects.create(
        user=request.user, 
        total_amount=total_amount, 
        paid_status=paid_status,
        payment_method=payment_method,
        )
    for item_data in items_data:
        schedule = Schedule.objects.get(id=item_data['schedule'])
        quantity = item_data['quantity']
        ScheduleOrderItem.objects.create(
            schedule_order=schedule_order, 
            schedule=schedule, 
            quantity=quantity
            )
    return Response(ScheduleOrderSerializer(schedule_order).data, status=201)

################################################
# THIS WILL LIST THE DETAILS SPECIFIC ORDER <id>

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def schedule_order_detail(request, id):
    try:
        order = ScheduleOrder.objects.get(pk=id)
    except ScheduleOrder.DoesNotExist:
        return Response({'error': 'Schedule Order not found'}, status=status.HTTP_404_NOT_FOUND)

    serializer = ScheduleOrderSerializer(order)
    return Response(serializer.data)

############################################################
# THIS WILL LET THE CURRENT USER UPDATE HIS/HER ORDER STATUS

@api_view(['PUT', 'PATCH'])
@permission_classes([IsAuthenticated])
def schedule_order_mark_as_paid(request, id):
    try:
        schedule_order = ScheduleOrder.objects.get(id=id)
    except ScheduleOrder.DoesNotExist:
        return Response({"error": "Schedule order does not exist"}, status=404)
    
    if schedule_order.user != request.user:
        return Response({"error": "You do not have permission on that order"}, status=401)

    # Update paid status and paid date
    schedule_order.paid_status = True
    schedule_order.paid_date = timezone.now()
    schedule_order.save()

    serializer = ScheduleOrderSerializer(schedule_order)
    return Response(serializer.data)

#################################################################################
# THIS WILL LET THE DELETION OF SPECIFIC SCHEDULE ORDER <id>, FOR ADMIN EYES ONLY

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
@permission_classes([IsAdminUser])
def schedule_order_delete(request, id):
    try:
        schedule_order = ScheduleOrder.objects.get(id=id)
    except ScheduleOrder.DoesNotExist:
        return Response({"error": "Schedule order does not exist"}, status=404)

    schedule_order.delete()
    return Response(status=204)

#############################################################
# THIS WILL LIST ALL THE SCHEDULE ORDERS, FOR ADMIN EYES ONLY

@api_view(['GET'])
@permission_classes([IsAuthenticated])
@permission_classes([IsAdminUser])
def schedule_order_list(request):
    schedule_orders = ScheduleOrder.objects.all()
    serializer = ScheduleOrderSerializer(schedule_orders, many=True)
    return Response(serializer.data)

########################################################################
# THIS VIEW IS FOR THE CURRENT USER TUTOR LOGGED IN
# THIS WILL FILTER ALL THE ORDERS WHERE THE TUTOR'S SCHEDULE IS INCLUDED 

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def schedule_order_list_me_included(request):
    user = request.user
    schedule_orders = ScheduleOrder.objects.filter(schedules__owner=user)
    serializer = ScheduleOrderSerializer(schedule_orders, many=True)
    return Response(serializer.data)

##############################################
# THIS WILL LIST ALL THE CURRENT USER'S ORDERS

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def my_schedule_order_list(request):
    user = request.user
    schedule_orders = ScheduleOrder.objects.filter(user=user)
    serializer = ScheduleOrderSerializer(schedule_orders, many=True)
    return Response(serializer.data)

####    END ORDERS   #####
##########################



############################
####    FOR CONTACT US  ####
####                    ####

##########################################################
# THIS WILL LET THE USER CREATE A CONCERN MESSAGE <object>

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def contact_add(request):
    data = request.data
    user = request.user
    contact = Contact.objects.create(
        name=user,
        concern=data['concern'],
        comment=data['comment'],
    )
    serializer = ContactSerializer(contact)
    return Response(serializer.data)

####################################################################
# THIS WILL LIST ALL THE CONCERNS BY EACH USERS, FOR ADMIN EYES ONLY

@api_view(['GET'])
@permission_classes([IsAuthenticated])
@permission_classes([IsAdminUser])
def contact_list(request):
    contacts = Contact.objects.all()
    serializer = ContactSerializer(contacts, many=True)
    return Response(serializer.data)

#####################################################################
# THIS WILL LIST SELECT AND LIST DETAILS OF THE SPECIFIC CONTACT <id>

@api_view(['GET'])
def contact_detail(request, id):
    contact = Contact.objects.get(id=id)
    serializer = ContactSerializer(contact, many=False)
    return Response(serializer.data, status=status.HTTP_200_OK)

####    END CONTACT US  ####
############################


