from django.contrib import admin
from . import models

admin.site.register(models.Subject)
admin.site.register(models.Schedule)
admin.site.register(models.User)
admin.site.register(models.OrderScheduleItem)
@admin.register(models.OrderSchedule)
class OrderScheduleAdmin(admin.ModelAdmin):
    list_display = ["user", "created_date", "total_price"]

admin.site.register(models.Contact)
