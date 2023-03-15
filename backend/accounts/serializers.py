from rest_framework import serializers
from rest_framework_simplejwt import serializers as jwt_serializers
from django.contrib.auth import get_user_model, authenticate
from . import models

User = get_user_model()

class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Subject
        fields = '__all__'


class ProductSerializer(serializers.ModelSerializer):
    subject_name = serializers.StringRelatedField()
    user = serializers.StringRelatedField()
    class Meta:
        model = models.Product
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    subject = serializers.StringRelatedField()
    product = serializers.StringRelatedField()
    class Meta:
        model = User
        fields = '__all__'


class MyTokenObtainPairSerializer(jwt_serializers.TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        data['username'] = self.user.username
        data['email'] = self.user.email

        return data


