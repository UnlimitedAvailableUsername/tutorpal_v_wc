from rest_framework import serializers
from rest_framework_simplejwt import serializers as jwt_serializers
from django.contrib.auth import get_user_model, authenticate
from .models import *

User = get_user_model()

class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    subject = serializers.StringRelatedField()
    product = serializers.StringRelatedField()
    isAdmin = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = User
        fields = '__all__'

    def get_isAdmin(self,obj):
        return obj.is_staff


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'


class ScheduleSerializer(serializers.ModelSerializer):
    reviews = serializers.SerializerMethodField(read_only= True)
    class Meta:
        model = Schedule
        fields = '__all__'

    def get_reviews(self,obj):
        reviews = obj.review_set.all()
        serializer = ReviewSerializer(reviews,many=True)
        return serializer.data


class UserSerializerWithToken(jwt_serializers.TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        data['username'] = self.user.username
        data['email'] = self.user.email
        data['staff'] = self.user.staff
        data['tutor'] = self.user.tutor
        data['student'] = self.user.student

        return data


