# Generated by Django 4.1.7 on 2023-03-11 09:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='bio',
            field=models.TextField(max_length=50, verbose_name='bio'),
        ),
        migrations.AlterField(
            model_name='user',
            name='contact',
            field=models.CharField(blank=True, max_length=50, verbose_name='contact number'),
        ),
    ]
