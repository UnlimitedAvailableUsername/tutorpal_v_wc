# Generated by Django 4.1.5 on 2023-04-02 16:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0002_contact'),
    ]

    operations = [
        migrations.AddField(
            model_name='contact',
            name='done',
            field=models.BooleanField(default=False),
        ),
    ]
