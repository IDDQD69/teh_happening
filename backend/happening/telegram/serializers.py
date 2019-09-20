from rest_framework import serializers


class ValidateSerializer(serializers.Serializer):
    id = serializers.CharField(allow_blank=False)
    hash = serializers.CharField(allow_blank=False)
    first_name = serializers.CharField(allow_blank=True)
    last_name = serializers.CharField(allow_blank=True)
    photo_url = serializers.CharField(allow_blank=True)
    username = serializers.CharField(allow_blank=True)
    auth_date = serializers.CharField(allow_blank=True)