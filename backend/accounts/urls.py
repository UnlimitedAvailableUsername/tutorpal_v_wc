from django.urls import path
from . import views

urlpatterns = [
    path('users/', views.users_list, name='users'),
    path('users/<int:id>/', views.user_detail, name='user'),
    path('users/register/', views.user_register, name='register'),
    path('users/validate_email_or_username/', views.validate_email_or_username, name='validate_username_or_email'),
    path('users/login/', views.user_login, name='my_token_obtain_pair'),
    path('users/profile/', views.user_profile,name="user_profile"),

    path('users/tutors/', views.users_tutor_list, name="tutors"),
    path('users/tutors/<int:id>/schedules/', views.schedule_list_of_tutor, name='schedules_of_tutor'),
    path('users/tutors/<int:id>/set_active/', views.user_tutor_update_active, name='tutor_activate'),
    
    path('users/tutors/students/', views.my_students_list_view, name="student_list_for_tutor"),
    path('users/tutors/students/<int:id>/', views.get_student_details_and_orders, name="student_details_for_tutor"),

    path('users/students/', views.users_student_list, name="students"),

    path('schedules/', views.schedule_list, name='schedule_list'),
    path('schedules/<int:id>/', views.schedule_detail, name='schedule_details'),
    path('schedules/my_list/', views.my_schedule_list, name='my_own_schedules'),
    path('schedules/create/', views.schedule_create, name='schedule_create'),

    path('schedule_orders/create/', views.schedule_order_create, name='schedule_order_create'),
    path('schedule_orders/<int:id>/', views.schedule_order_detail, name='schedule_order_detail'),
    path('schedule_orders/<int:id>/mark_as_paid/', views.schedule_order_mark_as_paid, name='schedule_mark_paid'),
    path('schedule_orders/<int:id>/mark_as_done/', views.schedule_order_mark_as_meeting_done, name='schedule_mark_session_done'),
    path('schedule_orders/<int:id>/delete/', views.schedule_order_delete, name='schedule_order_delete'),
    path('schedule_orders/', views.schedule_order_list, name='schedule_order_list'),
    path('schedule_orders/me_included/', views.schedule_order_list_me_included, name='schedule_order_list_with_me'),
    path('schedule_orders/my_list/', views.my_schedule_order_list, name='my_schedule_order_list'),


    path('subjects/', views.subject_list, name='subjects'),
    path('subjects/<int:id>/', views.subject_detail, name='subject'),
    path('subjects/<int:id>/users/', views.subject_list_users, name='subject_list_users'),

    path('contacts/', views.contact_list, name='contact'),
    path('contacts/create/', views.contact_add, name='add_contact'),
    path('contacts/<int:id>', views.contact_detail, name='contact_instance'),
    path('contacts/edit/<int:id>/', views.contact_edit, name='edit_contact'),

    path('reviews/', views.review_list, name='review_list'),
    path('reviews/tutors/<int:id>/', views.review_list_tutor, name='review_list_tutor'),
    path('reviews/<int:id>/', views.review_detail, name='review_detail_modification'),
    path('reviews/create/', views.review_create, name='review_create'),

]
