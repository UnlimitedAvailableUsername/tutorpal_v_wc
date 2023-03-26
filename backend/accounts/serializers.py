from rest_framework import serializers
from rest_framework_simplejwt import serializers as jwt_serializers
from django.contrib.auth import get_user_model, authenticate
from . import models

User = get_user_model()

class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Subject
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    subject = serializers.StringRelatedField()
    product = serializers.StringRelatedField()
    class Meta:
        model = User
        fields = '__all__'


class ProductSerializer(serializers.ModelSerializer):

    """
    This is where the juicy part comes in:
    """

    # subject_name = serializers.StringRelatedField()
    # Eto yung dati natin nakalagay dito ^^^
    
    subject_name = serializers.CharField(source='subject.subject_title', read_only=True)
    # palitan natin nito

    subject_title = serializers.CharField(write_only=True, allow_blank=False)
    # pero add natin ito

    user = serializers.StringRelatedField()
    class Meta:
        model = models.Product
        fields = '__all__'

    """
    We now then handle the logic everytime
    we want to create or edit a product:
    """

    def create(self, validated_data):
        subject_title = validated_data.pop('subject_title')
        subject_name = Subject.objects.get_or_create(subject_title=subject_title)[0]
        product = Product.objects.create(subject_name=subject_name, **validated_data)
        return product

    def update(self, instance, validated_data):
        subject_title = validated_data.pop('subject_title')
        subject = Subject.objects.get_or_create(subject_title=subject_title)[0]
        instance.subject_name = subject_name
        instance.title = validated_data.get('title', instance.title)
        instance.schedule = validated_data.get('schedule', instance.schedule)
        instance.save()
        return instance


class MyTokenObtainPairSerializer(jwt_serializers.TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        data['username'] = self.user.username
        data['email'] = self.user.email
        data['staff'] = self.user.staff

        return data


