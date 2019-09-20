from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response

from telegram.serializers import ValidateSerializer
from .utils import is_valid


class TelegramViewSet(viewsets.ViewSet):

    @action(detail=False, methods=['post'])
    def validate(self, request):
        serializer = ValidateSerializer(data=request.data, many=False)
        serializer.is_valid(raise_exception=True)
        return Response(status=status.HTTP_200_OK,
                        data={'valid': is_valid(serializer.data)})
