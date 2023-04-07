from django.contrib import admin
from . import models

admin.site.register(models.Subject)
admin.site.register(models.User)
# @admin.register(models.OrderSchedule)
# class OrderScheduleAdmin(admin.ModelAdmin):
#     list_display = ["user", "created_date", "total_price"]

admin.site.register(models.Contact)
admin.site.register(models.Review)



class ScheduleOrderItemInline(admin.TabularInline):
    model = models.ScheduleOrderItem
    extra = 1

class ScheduleOrder(admin.ModelAdmin):
    inlines = [ScheduleOrderItemInline]

admin.site.register(models.ScheduleOrder, ScheduleOrder)
@admin.register(models.Schedule)
class ScheduleAdmin(admin.ModelAdmin):
    list_display = [
        "name","owner","count_in_stock","price"
    ]