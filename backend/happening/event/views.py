from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from rest_framework.generics import ListAPIView

from event.serializers import EventSerializer
from .models import Event


class EventViewSet(viewsets.ModelViewSet, ListAPIView):
    model = Event
    queryset = Event.objects.all()
    serializer_class = EventSerializer
