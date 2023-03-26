from django.urls import path, include
from . import views 
from rest_framework_simplejwt import views as jwt_views

urlpatterns = [
    path('', views.getRoutes, name='routes'),
    path('users', views.getUsers, name='users'),
    path('user/<str:pk>', views.getUser, name='user'),

    path('products/', views.getProducts, name='products'),
    path('product/create', views.addProduct, name='add_product'),
    path('product/<str:pk>', views.getProduct, name='product'),

    path('subjects/', views.getSubjects, name='subjects'),
    path('subject/<str:pk>', views.getSubject, name='subject'),

    path('auth/token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('auth/register/', views.RegisterAPI.as_view(), name='register'),
    path('auth/login/', views.MyTokenObtainPairView.as_view(), name='my_token_obtain_pair'),
]
