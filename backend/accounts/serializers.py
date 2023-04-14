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

<<<<<<< HEAD

# class UserSerializer(serializers.ModelSerializer):
#     subject = serializers.StringRelatedField()
#     # product = serializers.StringRelatedField()
#     class Meta:
#         model = User
#         fields = '__all__'


#//FOR REGSISTER VIEW (PARTIAL)
class UserSerializer(serializers.ModelSerializer):
    subject = serializers.StringRelatedField()
    student = serializers.BooleanField()
    class Meta:
        model = User
        fields = '__all__'

    def create(self, validated_data):
        user = User.objects.create(email=validated_data['email'],
                                       username=validated_data['username'],
                                       first_name=validated_data['first_name'],
                                       last_name=validated_data['last_name'],
                                       student=validated_data['student'],
                                       
                                         )
        user.set_password(validated_data['password'])
        user.save()
        return user







class UserSerializerWithToken(jwt_serializers.TokenObtainPairSerializer):
    def validate(self, attrs):
        # data = super().validate(attrs)
        # data['username'] = self.user.username
        # data['email'] = self.user.email
        # data['staff'] = self.user.staff
        # data['tutor'] = self.user.tutor
        # data['student'] = self.user.student

        # return data

        data = super().validate(attrs)
        user = self.user

        # Serialize User object and add to response data
        user_serializer = UserSerializer(user)
        data['user'] = user_serializer.data

        return data
     
# //FOR UPDATE PROFILE & {REGISTER VIEW (PARTIAL)}
class UserSerializerWithToken1(UserSerializer):
    student = serializers.SerializerMethodField(read_only=True)
    token = serializers.SerializerMethodField(read_only=True)
    
    class Meta:
        model = User
        fields = '__all__'

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)
    def get_student(self, obj):
        return obj.is_student


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'


=======
>>>>>>> master
class ScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Schedule
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    schedules = ScheduleSerializer(source='schedule_set', many=True, required=False, read_only=True)
    subjects = SubjectSerializer(many=True, required=False)

    class Meta:
        model = User
        fields = '__all__'
        extra_kwargs = {'password': {'write_only': True}}

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
        return obj.user_student.username
    
    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['user_student'] = instance.user_student.username
        return data

class ContactSerializer(serializers.ModelSerializer):
    email = serializers.StringRelatedField()

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
