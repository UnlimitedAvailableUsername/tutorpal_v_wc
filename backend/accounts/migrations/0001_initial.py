# Generated by Django 4.1.7 on 2023-03-11 09:14

import accounts.models
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(error_messages={'unique': 'A user with that username already exists.'}, help_text='Required. 150 characters or fewer', max_length=150, unique=True, verbose_name='username')),
                ('email', models.EmailField(blank=True, max_length=254, unique=True, verbose_name='email address')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('first_name', models.CharField(blank=True, max_length=150, verbose_name='first name')),
                ('last_name', models.CharField(blank=True, max_length=150, verbose_name='last name')),
                ('profile_picture', models.ImageField(default='profile_pictures/default/tutor.jpg', null=True, upload_to=accounts.models.upload_image_path, verbose_name='User Picture')),
                ('contact', models.CharField(max_length=50, verbose_name='contact number')),
                ('bio', models.CharField(max_length=50, verbose_name='bio')),
                ('numReviews', models.IntegerField(blank=True, null=True, verbose_name='reviews')),
                ('active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')),
                ('staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('student', models.BooleanField(default=False, help_text='Categorizes the user as student', verbose_name='Student')),
                ('tutor', models.BooleanField(default=False, help_text='Categorizes the user as tutor', verbose_name='Tutor')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Subject',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('subject_title', models.TextField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('schedule', models.TextField(max_length=300, null=True)),
                ('lesson_name', models.CharField(blank=True, max_length=300, null=True)),
                ('rate_hour', models.DecimalField(blank=True, decimal_places=2, max_digits=5, null=True)),
                ('_id', models.AutoField(primary_key=True, serialize=False)),
                ('subject_name', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='accounts.subject')),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='user',
            name='subject',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='accounts.subject'),
        ),
    ]
