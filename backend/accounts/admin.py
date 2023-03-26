from django.contrib import admin
from . import models

admin.site.register(models.Subject)
admin.site.register(models.Schedule)
admin.site.register(models.User)