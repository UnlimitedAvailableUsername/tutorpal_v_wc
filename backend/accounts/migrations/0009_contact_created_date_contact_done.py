# Generated by Django 4.1.5 on 2023-04-15 11:38

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0008_alter_user_active'),
    ]

    operations = [
        migrations.AddField(
            model_name='contact',
            name='created_date',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='contact',
            name='done',
            field=models.BooleanField(default=False),
        ),
    ]
