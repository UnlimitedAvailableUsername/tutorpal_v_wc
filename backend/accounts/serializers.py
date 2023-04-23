# DJANGO IMPORTS
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password
from django.db.models.query import QuerySet

# REST FRAMEWORK IMPORTS
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken

# LOCAL IMPORTS
from .models import *

User = get_user_model()


class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = '__all__'


class ScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Schedule
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    schedules = ScheduleSerializer(source='schedule_set', many=True, required=False, read_only=True)
    subjects = SubjectSerializer(many=True, required=False)
    have_ordered = serializers.SerializerMethodField()
    has_reviewed = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = '__all__'
        extra_kwargs = {'password': {'write_only': True}}

    def get_have_ordered(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            user_id = obj.id
            request_user_id = request.user.id
            tutor_id = user_id
            try:
                ScheduleOrder.objects.get(user_id=request_user_id, tutor_id=tutor_id)
                return True
            except ScheduleOrder.DoesNotExist:
                pass
        return False
    
    def get_has_reviewed(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            # get the Review objects where the user_student is the authenticated user
            reviews = Review.objects.filter(user_student=request.user, user_tutor=obj)

            # return True if there is at least one review
            return reviews.exists()

        # return False if the user is not authenticated
        return False

# NOTE: THIS SERIALIZER MUST ONLY BE USED FOR AUTHENTICATION
# OR ANY TYPE OF PERSONAL USER MODIFICATION SUCH AS UPDATE
# PROFILE, DELETE MY PROFILE ETC. THIS IS DUE TO THE FACT THAT
# THIS RETURNS THE TOKEN AND REFRESH KEYS

class UserSerializerWithToken(serializers.ModelSerializer):
    schedules = ScheduleSerializer(source='schedule_set', many=True, required=False)
    subjects = SubjectSerializer(many=True, required=False)
    token = serializers.SerializerMethodField(read_only=True)
    refresh = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = '__all__'

    def get_token(self, obj):
        token = AccessToken.for_user(obj)
        return str(token)

    def get_refresh(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token)

class ReviewSerializer(serializers.ModelSerializer):
    user_student = serializers.SerializerMethodField()

    class Meta:
        model = Review
        fields = '__all__'

    def get_user_student(self, obj):
        if isinstance(obj, QuerySet):
            return [review.user_student.username for review in obj]
        return obj.user_student.username
    
    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['user_student'] = instance.user_student.username
        return data

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = '__all__'

class TutorSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'meeting_link']

class ScheduleOrderSerializer(serializers.ModelSerializer):
    schedules = ScheduleSerializer(many=True, read_only=True)
    payment_method = serializers.CharField(max_length=200)
    tutor = TutorSerializer(read_only=True)

    class Meta:
        model = ScheduleOrder
        fields = '__all__'

