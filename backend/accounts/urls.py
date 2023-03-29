from django.urls import path, include
from . import views 
from rest_framework_simplejwt import views as jwt_views

urlpatterns = [
    path('', views.getRoutes, name='routes'),
    path('users', views.getUsers, name='users'),
    path('users/<str:pk>', views.getUser, name='user'),
    path('users/register/', views.register, name='register'),
    path('users/login/', views.user_token_obtain_pair_view, name='my_token_obtain_pair'),
    path('users/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('users/upload/', views.upload_profile_picture, name="upload_image"),

    path('schedules/', views.getProducts, name='products'),
    path('schedules/create', views.addProduct, name='add_product'),
    path('schedules/<str:pk>', views.getProduct, name='product'),

    path('subjects/', views.getSubjects, name='subjects'),
    path('subjects/<str:pk>', views.getSubject, name='subject'),

    path('api/orders/', views.getOrders, name="allorders"),
    path('api/orders/add/', views.addOrderItems, name="orders-add"),
    path('api/orders/myorders/', views.getMyOrders, name="myorders"),

    path('api/orders/<str:pk>/', views.getOrderById, name="user-order"),
    path('api/orders/<str:pk>/pay/', views.updateOrderToPaid, name="pay"),

]
