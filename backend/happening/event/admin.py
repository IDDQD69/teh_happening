from django.contrib import admin

from .models import Event

# Register your models here.
@admin.register(Event)
class EventModel(admin.ModelAdmin):
    pass
