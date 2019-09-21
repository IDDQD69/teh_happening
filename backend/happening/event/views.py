from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.generics import ListAPIView, get_object_or_404, CreateAPIView
from rest_framework.response import Response

from event.serializers import EventSerializer, ParticipantSerializer, CreateEventSerializer
from telegram.serializers import ValidateSerializer
from .models import Event, Participant


class EventViewSet(viewsets.ModelViewSet, ListAPIView):
    model = Event
    queryset = Event.objects.all()
    serializer_class = EventSerializer

    def create(self, request):
        """create"""
        serializer = CreateEventSerializer(data=request.data, many=False)
        serializer.is_valid(raise_exception=True)
        event = self.model.objects.create(
            name=serializer.data['name'],
            created_by=serializer.data['login']['username'],
            date=serializer.data['date'],
        )
        Participant.objects.create(
            event=event,
            username=serializer.data['login']['username'],
            status=Participant.STATUS_YES
        )
        return Response(EventSerializer(event).data)

    @action(detail=False, methods=['post'])
    def own(self, request):
        serializer = ValidateSerializer(data=request.data, many=False)
        serializer.is_valid(raise_exception=True)
        queryset = Event.objects.filter(participants__username=serializer.data['username'])
        return_serializer = EventSerializer(queryset, many=True)
        return Response(return_serializer.data)

    @action(detail=True, methods=['get'])
    def participants(self, request, pk=None):
        event = get_object_or_404(Event, id=pk)
        queryset = Participant.objects.filter(event=event)
        serializer = ParticipantSerializer(queryset, many=True)
        return Response(serializer.data)
