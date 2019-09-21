from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.generics import ListAPIView
from rest_framework.response import Response

from chat.models import Chat
from .serializers import ChatSerializer, GetChatSerializer, CreateChatSerializer
from event.models import Event


class ChatViewSet(viewsets.ModelViewSet, ListAPIView):
    model = Event
    queryset = Event.objects.all()
    serializer_class = ChatSerializer

    def create(self, request):
        serializer = CreateChatSerializer(data=request.data, many=False)
        serializer.is_valid(raise_exception=True)
        event = get_object_or_404(Event, id=serializer.data['id'])
        Chat.objects.create(
            event=event,
            username=serializer.data['login']['username'],
            message=serializer.data['message']
        )
        queryset = Chat.objects.filter(event=serializer.data['id'])
        return_serializer = ChatSerializer(queryset, many=True)
        return Response(return_serializer.data)

    @action(detail=False, methods=['post'])
    def get(self, request):
        serializer = GetChatSerializer(data=request.data, many=False)
        serializer.is_valid(raise_exception=True)
        queryset = Chat.objects.filter(event=serializer.data['id'])
        return_serializer = ChatSerializer(queryset, many=True)
        return Response(return_serializer.data)
