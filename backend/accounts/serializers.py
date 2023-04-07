# DJANGO IMPORTS
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password

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
        extra_kwargs = {'users': {'required': False}}

class ScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Schedule
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    schedules = ScheduleSerializer(source='schedule_set', many=True, required=False)

    class Meta:
        model = User
        fields = '__all__'

# NOTE: THIS SERIALIZER MUST ONLY BE USED FOR AUTHENTICATION
# OR ANY TYPE OF PERSONAL USER MODIFICATION SUCH AS UPDATE
# PROFILE, DELETE MY PROFILE ETC. THIS IS DUE TO THE FACT THAT
# THIS RETURNS THE TOKEN AND REFRESH KEYS

class UserSerializerWithToken(serializers.ModelSerializer):
    schedules = ScheduleSerializer(source='schedule_set', many=True, required=False)
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
    
    def create(self, validated_data):
        password = validated_data.pop('password')
        hashed_password = make_password(password)
        user = User.objects.create(password=hashed_password, **validated_data)
        return user

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        if password:
            hashed_password = make_password(password)
            instance.password = hashed_password
        return super().update(instance, validated_data)

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = '__all__'

class ScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Schedule
        fields = '__all__'

class ScheduleOrderSerializer(serializers.ModelSerializer):
    schedules = ScheduleSerializer(many=True, read_only=True)
    payment_method = serializers.CharField(max_length=200)

    class Meta:
        model = ScheduleOrder
        fields = '__all__'
