# Generated by Django 4.2 on 2023-04-21 05:29

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0011_scheduleorder_tutor_alter_scheduleorder_user'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='scheduleorder',
            name='tutor',
        ),
        migrations.AlterField(
            model_name='scheduleorder',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
