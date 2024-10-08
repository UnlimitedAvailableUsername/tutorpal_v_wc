# Generated by Django 4.2 on 2023-04-14 05:33

import accounts.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0004_scheduleorder_session_status_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='photo_education_backend',
        ),
        migrations.AddField(
            model_name='user',
            name='photo_education_background',
            field=models.ImageField(blank=True, null=True, upload_to=accounts.models.upload_image_edu_bg_path, verbose_name='Education Background'),
        ),
        migrations.AlterField(
            model_name='user',
            name='numReviews',
            field=models.IntegerField(default=0, null=True, verbose_name='Reviews'),
        ),
        migrations.AlterField(
            model_name='user',
            name='photo_id',
            field=models.ImageField(blank=True, null=True, upload_to=accounts.models.upload_image_id_path, verbose_name='Photo ID'),
        ),
    ]
