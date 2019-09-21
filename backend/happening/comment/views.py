from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.generics import ListAPIView, get_object_or_404
from rest_framework.response import Response

from comment.models import Comment
from .serializers import CommentSerializer, CreateCommentSerializer, GetCommentSerializer
from event.models import Event


class CommentViewSet(viewsets.ModelViewSet, ListAPIView):
    model = Event
    queryset = Event.objects.all()
    serializer_class = CommentSerializer

    def create(self, request):
        serializer = CreateCommentSerializer(data=request.data, many=False)
        serializer.is_valid(raise_exception=True)
        event = get_object_or_404(Event, id=serializer.data['id'])

        if serializer.data['target']:
            target_comment = get_object_or_404(Comment, id=serializer.data['target'])
        else:
            target_comment = None
        Comment.objects.create(
            event=event,
            comment=serializer.data['comment'],
            parent_comment=target_comment,
            username=serializer.data['login']['username'],
        )
        return Response()

    @action(detail=False, methods=['post'])
    def get(self, request):
        serializer = GetCommentSerializer(data=request.data, many=False)
        serializer.is_valid(raise_exception=True)
        event = get_object_or_404(Event, id=serializer.data['id'])
        queryset = Comment.objects.filter(event=event, parent_comment=None)
        return_serializer = CommentSerializer(queryset, many=True)
        return Response(return_serializer.data)
