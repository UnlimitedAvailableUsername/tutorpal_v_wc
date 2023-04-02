from django.urls import path, include
from . import views 
from rest_framework_simplejwt import views as jwt_views

urlpatterns = [
    path('', views.getRoutes, name='routes'),
    path('users', views.getUsers, name='users'),
    path('users/<str:pk>', views.getUser, name='user'),
    # path('users/register/', views.register, name='register'),

    #//PARTIAL 
    path('users/register/', views.RegisterView.as_view(), name='register'),
    
    path('users/login/', views.user_token_obtain_pair_view, name='my_token_obtain_pair'),
    path('users/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('users/upload/', views.uploadProfilePicture, name="upload_image"),
    path('users/current/', views.updateUserProfile, name="update_current_user"),
    path('users/profile/',views.getUserProfile,name="user_profile"),
    path('users/profile/update/',views.updateUserProfile,name="user_profile_update"),

    path('schedules/', views.getProducts, name='products'),
    path('schedules/create', views.addProduct, name='add_product'),
    path('schedules/<str:pk>', views.getProduct, name='product'),

    path('subjects/', views.getSubjects, name='subjects'),
    path('subjects/<str:pk>', views.getSubject, name='subject'),

    path('orders/', views.getOrders, name="allorders"),
    path('orders/add/', views.addOrderItems, name="orders-add"),
    path('orders/myorders/', views.getMyOrders, name="myorders"),

    path('orders/<str:pk>/', views.getOrderById, name="user-order"),
    path('orders/<str:pk>/pay/', views.updateOrderToPaid, name="pay"),

    path('contact/create', views.addContact, name='add_contact'),
    path('contacts/', views.getContacts, name='contact'),
    # path('contacts/<str:pk>', views.getContact, name='contact'),
]
