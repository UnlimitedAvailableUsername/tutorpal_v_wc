import datetime
from decimal import Decimal

from rest_framework import serializers

from django.db.models.fields.files import ImageFieldFile
from django.forms.models import model_to_dict

from rest_framework_simplejwt import serializers as jwt_serializers
from django.contrib.auth import get_user_model, authenticate
from .models import *
from rest_framework_simplejwt.tokens import RefreshToken

User = get_user_model()

class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    # subject = serializers.StringRelatedField()
    # product = serializers.StringRelatedField()
    class Meta:
        model = User
        fields = '__all__'


class UserSerializerWithToken1(UserSerializer):
    token= serializers.SerializerMethodField(read_only=True)
    class Meta:
        model =User
        fields = '__all__'

    def get_token(self,obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'


class ScheduleSerializer(serializers.ModelSerializer):
    reviews = serializers.SerializerMethodField(read_only= True)
    class Meta:
        model = Schedule
        fields = '__all__'

    def get_reviews(self, obj):
        reviews = obj.review_set.all()
        serializer = ReviewSerializer(reviews,many=True)
        return serializer.data




class CartScheduleItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartScheduleItem
        fields = '__all__'

class CartScheduleSerializer(serializers.ModelSerializer):
    orderItems = serializers.SerializerMethodField(read_only=True)
    User = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = CartSchedule
        fields = '__all__'

    def get_orderItems(self, obj):
        items = obj.orderitem_set.all()
        serializer = CartScheduleItemSerializer(items,many=True)
        return serializer.data

    def get_User(self, obj):
        items = obj.user
        serializer = UserSerializer(items,many=False)
        return serializer.data


class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = '__all__'
