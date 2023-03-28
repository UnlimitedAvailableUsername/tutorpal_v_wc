from django.urls import path, include
from . import views 
from rest_framework_simplejwt import views as jwt_views

urlpatterns = [
    path('', views.getRoutes, name='routes'),
    path('users', views.getUsers, name='users'),
    path('users/<str:pk>', views.getUser, name='user'),
    path('users/token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('users/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('users/register/', views.register, name='register'),
    path('users/login/', views.MyTokenObtainPairView.as_view(), name='my_token_obtain_pair'),

    path('products/', views.getProducts, name='products'),
    path('products/create', views.addProduct, name='add_product'),
    path('products/<str:pk>', views.getProduct, name='product'),

    path('subjects/', views.getSubjects, name='subjects'),
    path('subjects/<str:pk>', views.getSubject, name='subject'),

]
