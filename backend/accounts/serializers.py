from rest_framework import serializers
from rest_framework_simplejwt import serializers as jwt_serializers
from django.contrib.auth import get_user_model, authenticate
from .models import *
from rest_framework_simplejwt.tokens import RefreshToken

User = get_user_model()

class SubjectSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Subject
        fields = '__all__'


# class UserSerializer(serializers.ModelSerializer):
#     subject = serializers.StringRelatedField()
#     # product = serializers.StringRelatedField()
#     class Meta:
#         model = User
#         fields = '__all__'


#//FOR REGSISTER VIEW (PARTIAL)
class UserSerializer(serializers.ModelSerializer):
    subject = serializers.StringRelatedField()
    class Meta:
        model = User
        fields = '__all__'

    def create(self, validated_data):
        user = User.objects.create(email=validated_data['email'],
                                       username=validated_data['username'],
                                       first_name=validated_data['first_name'],
                                       last_name=validated_data['last_name'],
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
    token = serializers.SerializerMethodField(read_only=True)
    
    class Meta:
        model = User
        fields = '__all__'

    def get_token(self, obj):
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
    email = serializers.StringRelatedField()

    class Meta:
        model = Contact
        fields = '__all__'
