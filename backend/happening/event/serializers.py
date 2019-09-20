from rest_framework import serializers

from event.models import Event, Participant
from telegram.serializers import ValidateSerializer


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'


class ParticipantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Participant
        fields = '__all__'


class CreateEventSerializer(serializers.Serializer):
    login = ValidateSerializer()
    name = serializers.CharField(
        allow_blank=False,
        required=True,
        min_length=5
    )
    date = serializers.DateField(required=False)
