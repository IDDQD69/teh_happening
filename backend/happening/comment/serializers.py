from rest_framework import serializers

from telegram.serializers import ValidateSerializer
from .models import Comment


class SubCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'


class CommentSerializer(serializers.ModelSerializer):
    parent_comment = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Comment
        fields = '__all__'

    def get_fields(self):
        fields = super(CommentSerializer, self).get_fields()
        fields['subcomments'] = CommentSerializer(many=True)
        return fields


class CreateCommentSerializer(serializers.Serializer):
    login = ValidateSerializer()
    id = serializers.IntegerField()
    comment = serializers.CharField()
    target = serializers.IntegerField(allow_null=True, required=False)


class GetCommentSerializer(serializers.Serializer):
    login = ValidateSerializer()
    id = serializers.IntegerField()
