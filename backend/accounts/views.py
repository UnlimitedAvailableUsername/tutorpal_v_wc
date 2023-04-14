<<<<<<< HEAD
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
=======
## FROM DJANGO
from django.contrib.auth import get_user_model, authenticate
from django.contrib.auth.hashers import make_password

## FROM REST FRAMEWORK IMPORTS
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import APIException
from rest_framework.permissions import IsAuthenticated, IsAdminUser

## FOR REST FRAMEWORK FUNCTION-BASED VIEWS:
>>>>>>> master
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
    except Subject.DoesNotExist:
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
<<<<<<< HEAD
def getSchedules(request):
    Schedules = Schedule.objects.all()
    serializer = ScheduleSerializer(Schedules, many=True)
    return Response(serializer.data)



@api_view(['GET'])
def getSchedule(request, pk):
    schedule = Schedule.objects.get(_id=pk)
    serializer = ScheduleSerializer(schedule, many=False)
    return Response(serializer.data)


# For fetching all the users
@api_view(['GET'])
# @permission_classes([IsAdminUser])
def getUsers(request):
=======
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
>>>>>>> master
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

###########################
# THIS WILL LIST ALL TUTORS

@api_view(['GET'])
<<<<<<< HEAD
def getSubjects(request):
    subjects = Subject.objects.all()
    serializer = SubjectSerializer(subjects, many=True)
    return Response(serializer.data)
=======
def users_tutor_list(request):
    users = User.objects.filter(tutor=True, active=True)
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)
>>>>>>> master

##################################################
# THIS WILL LIST ALL STUDENTS, FOR ADMIN EYES ONLY

@api_view(['GET'])
<<<<<<< HEAD
def getSubject(request, pk):
    subject = Subject.objects.get(id=pk)
    serializer = SubjectSerializer(subject, many=False)
    return Response(serializer.data)
=======
@permission_classes([IsAdminUser])
def users_student_list(request):
    users = User.objects.filter(student=True)
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)
>>>>>>> master

######################################################################
# THIS WILL CALL, BE ABLE TO UPDATE, AND DELETE THE SPECIFIC USER <id>

<<<<<<< HEAD
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






@permission_classes([IsAuthenticated])
@api_view(["POST", "GET"])
def addSchedule(request):
    data = request.data
    print (data)
    try:
        user1 = request.user
        price1= request.user.price_rate_hour
        print(user1)
        schedule = Schedule.objects.create(
        date = data['date'],
        user = user1,
        count_in_stock_hour = data['stock'],
        price = price1,
        )
        serializer = ScheduleSerializer(schedule, many=False)
        return Response(serializer.data)
    except:
        message = {'detail': 'Test'}
        return Response(message)


=======
@api_view(['GET', 'PUT', 'DELETE'])
def user_detail(request, id):
    try:
        user = User.objects.get(id=id)
    except User.DoesNotExist:
        return Response({"error": "User does not exist."}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = UserSerializer(user, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)

    elif request.method == 'PUT':
        serializer = UserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


################################################################################
# THIS WILL LET THE USER LOGIN AND RETURN 'ACCESS' AS 'TOKEN' AND 'REFRESH' KEYS

>>>>>>> master
@api_view(['POST'])
def user_login(request):
    email = request.data.get('email', None)
    password = request.data.get('password', None)

    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response({'detail': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

    user = authenticate(email=email, password=password)

    if user is None:
        return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

    serializer = UserSerializerWithToken(user)
    response_data = serializer.data

    response_data['token'] = serializer.get_token(user)
    response_data['refresh'] = serializer.get_refresh(user)

    return Response(response_data, status=status.HTTP_200_OK)

#######################################################################
# THIS WILL LET US CREATE A TEMPORARY DIRECTORY TO STORE THE IMAGE FILE

from django.core.files.base import ContentFile

def handle_uploaded_file(f):
    return ContentFile(f.read())

#######################################################################################
# THIS WILL LET THE USERS REGISTER AND RETURN AN 'ACCESS' AS 'TOKEN' AND 'REFRESH' KEYS
# NOTE: USE 'Content-Type': 'multipart/form-data' FOR 'headers'
# WHEN REGISTERING WITH AN IMAGE FILE ON THE PROFILE PICTURE

@api_view(['POST'])
def user_register(request):
    # Important, because we don't want Django to mutate our data
    data = request.data.copy()
    subjects_data = data.pop('subjects', [])
    password = data.pop('password')
    hashed_password = make_password(str(password))
    data['password'] = hashed_password
    
    # Validate subject IDs
    subject_ids = [int(id) for id in subjects_data]
    invalid_ids = set(subject_ids) - set(Subject.objects.values_list('id', flat=True))
    if invalid_ids:
        return Response({'subjects': [f"Subject with ID {id} does not exist." for id in invalid_ids]}, status=status.HTTP_400_BAD_REQUEST)
    
    # Set active based on tutor and student fields
    if data.get('tutor'):
        data['active'] = False
    elif data.get('student'):
        data['active'] = True

    serializer = UserSerializer(data=data)
    if serializer.is_valid():
        user = serializer.save()
        profile_picture = request.FILES.get('profile_picture')
        if profile_picture:
            user.profile_picture.save(profile_picture.name, profile_picture, save=True)
            response_data = serializer.data
            response_data['profile_picture_url'] = request.build_absolute_uri(user.profile_picture.url)

        # Associate subjects with user
        subjects = Subject.objects.filter(id__in=subjects_data)
        user.subjects.set(subjects)

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

@api_view(['GET', 'PUT'])
def user_profile(request):
    user = request.user
    if request.method == 'GET':
        serializer = UserSerializerWithToken(user)
        return Response(serializer.data)
    elif request.method == 'PUT':
        data = request.data.copy()
        password = data.pop('password', None)
        if password:
            data['password'] = make_password(str(password))
        subject_ids = data.pop('subjects', [])
        
        # Exclude empty strings and None values
        subject_ids = [sid for sid in subject_ids if sid]
        
        serializer = UserSerializerWithToken(user, data=data, partial=True)
        if serializer.is_valid():
            profile_picture = request.FILES.get('profile_picture')
            if profile_picture:
                image_path = handle_uploaded_file(profile_picture)
                # Update the user profile with the image file path
                user.profile_picture = image_path
            user.save()
            serializer.save()
            Schedule.objects.filter(owner=user).update(price=user.price_rate_hour)
            
            if subject_ids:
                try:
                    subjects = Subject.objects.filter(id__in=subject_ids)
                    if subjects.count() != len(subject_ids):
                        raise serializers.ValidationError("Invalid subject id(s)")
                except Subject.DoesNotExist:
                    raise serializers.ValidationError("Invalid subject id(s)")
                # add or remove subjects as necessary
                user.subjects.clear()
                for subject_id in subject_ids:
                    try:
                        subject = Subject.objects.get(id=subject_id)
                        user.subjects.add(subject)
                    except Subject.DoesNotExist:
                        # if the subject does not exist, return an error
                        return Response({'subjects': f'Subject with id {subject_id} does not exist.'}, status=status.HTTP_400_BAD_REQUEST)
            else:
                user.subjects.clear()

            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

####    END USERS   ####
########################



<<<<<<< HEAD
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
    
=======
############################
####    FOR SCHEDULES   ####
####                    ####

#####################################################
# THIS WILL LIST ALL SCHEDULES OF SPECIFIC TUTOR <id>

>>>>>>> master
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



############################
####    FOR ORDERS      ####

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



################################
####    FOR CONTACT US      ####
####                        ####

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
<<<<<<< HEAD
    return Response(serializer.data)
=======
    return Response(serializer.data, status=status.HTTP_200_OK)
>>>>>>> master

####    END CONTACT US      ####
################################



############################
####    FOR REVIEWS     ####

#####################################################
# THIS WILL LIST ALL THE REVIEWS, FOR ADMIN EYES ONLY

@api_view(['GET'])
@permission_classes([IsAdminUser])
def review_list(request):
    review = Review.objects.all()
    serializer = ReviewSerializer(review)
    return Response(serializer.data, status=status.HTTP_200_OK)

##################################################################
# THIS WILL GIVE A LIST OF ALL REVIEWS ON SPECIFIC USER TUTOR <id>

@api_view(['GET'])
def review_list_tutor(request, id):
    review = Review.objects.filter(user_tutor=id)
    serializer = ReviewSerializer(review)
    return Response(serializer.data, status=status.HTTP_200_OK)

################################################
# THIS WILL LET THE CURRENT USER CREATE A REVIEW

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def review_create(request):
    data = request.data
<<<<<<< HEAD
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
=======
    user = request.user
    user_tutor_id = data.get('user_tutor')
    rating = data.get('rating')
    comment = data.get('comment')
    try:
        user_tutor = User.objects.get(id=user_tutor_id)
    except User.DoesNotExist:
        return Response({'detail': 'The tutor does not exist.'}, status=status.HTTP_404_NOT_FOUND)
    if user_tutor == request.user:
        return Response({'error': 'You cannot create a review for yourself.'}, status=status.HTTP_400_BAD_REQUEST)
    
    review = Review.objects.create(
        user_tutor=user_tutor, 
        user_student=user, 
        rating=rating, 
        comment=comment,
    )

    # Increase the numReviews of the tutor associated with the review created
    user_tutor.numReviews = user_tutor.reviews_received.count()
    user_tutor.save()

    serializer = ReviewSerializer(review)
    return Response(serializer.data, status=status.HTTP_201_CREATED)

##############################################################################
# THIS WILL LET THE USER SEE THE DETAILS, EDIT, AND DELETE HIS/HER REVIEW <id>
# IT ALSO PERMITS THE ADMINS TO MODIFY IT

@api_view(['GET', 'PUT', 'DELETE'])
def review_detail(request, id):
    user = request.user
    try:
        review = Review.objects.get(id=id)
    except Review.DoesNotExist:
        return Response({'detail': 'That review does not exist'}, status=status.HTTP_404_NOT_FOUND)

    # Get the user who created the review
    review_creator = review.user_student

    # Only allow the user who created the review and admin to modify or delete it
    if user != review_creator and not user.is_superuser:
        return Response({'detail': 'You do not have permission to modify or delete this review.'}, status=status.HTTP_403_FORBIDDEN)

    if request.method == 'GET':
        serializer = ReviewSerializer(review)
        return Response(serializer.data)
    elif request.method == 'PUT':
        data = request.data
        serializer = ReviewSerializer(review, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        review.delete()
        return Response({'detail': 'Review successfully deleted.'})

####    FOR REVIEWS     ####
############################
>>>>>>> master
