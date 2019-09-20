from django.contrib import admin

from .models import Event, Participant


@admin.register(Event)
class EventModel(admin.ModelAdmin):
    pass


@admin.register(Participant)
class ParticipantModel(admin.ModelAdmin):
    pass
