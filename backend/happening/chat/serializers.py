from rest_framework import serializers

from telegram.serializers import ValidateSerializer
from .models import Chat


class ChatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chat
        fields = '__all__'


class CreateChatSerializer(serializers.Serializer):
    login = ValidateSerializer()
    id = serializers.IntegerField()
    message = serializers.CharField()


class GetChatSerializer(serializers.Serializer):
    login = ValidateSerializer()
    id = serializers.IntegerField()
