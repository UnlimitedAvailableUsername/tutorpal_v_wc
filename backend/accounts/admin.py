from django.contrib import admin
from . import models

admin.site.register(models.Subject)
admin.site.register(models.Schedule)
admin.site.register(models.User)
admin.site.register(models.CartScheduleItem)
admin.site.register(models.CartSchedule)