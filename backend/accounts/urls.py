from django.urls import path, include
from . import views
from rest_framework_simplejwt import views as jwt_views

urlpatterns = [
    path('users/', views.getUsers, name='users'),
    path('users/<str:pk>', views.getUser, name='user'),
    path('users/register/', views.registerUser, name='register'),
    path('users/login/', views.loginUser, name='my_token_obtain_pair'),
    path('users/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('users/upload/', views.uploadProfilePicture, name="upload_image"),
    path('users/current/', views.updateUserProfile, name="update_current_user"),
    path('users/profile/', views.getUserProfile,name="user_profile"),
    path('users/profile/update/', views.updateUserProfile,name="user_profile_update"),
    path('users/<str:pk>/schedules/', views.getScheduleOfTutor, name="get_current_user_schedule"),
    path('users/<int:user_id>/my-own-schedules/', views.getMyOwnSchedules, name="get_logged_user_schedule"),

    path('tutors/', views.getTutorUsers, name="tutors"),

    # path('schedules/', views.getSchedules, name='products'),
    path('schedules/create/', views.addSchedule, name='add_product'),
    # path('schedules/<str:pk>', views.getSchedule, name='product'),

    path('subjects/', views.getSubjects, name='subjects'),
    path('subjects/<str:pk>', views.getSubject, name='subject'),
    path('subjects/<int:subject_id>/users/', views.getUsersBySubject, name='get_users_by_subject'),

    path('orders/', views.getOrders, name="allorders"),
    path('orders/add/', views.addOrderItems, name="orders-add"),
    path('orders/myorders/', views.getMyOrders, name="myorders"),

    path('orders/<str:pk>/', views.getOrderById, name="user-order"),
    path('orders/<str:pk>/pay/', views.updateOrderToPaid, name="pay"),

    path('contacts/', views.getContacts, name='contact'),
    path('contact/create/', views.addContact, name='add_contact'),
    path('contacts/<str:pk>', views.getContact, name='contact'),

]
