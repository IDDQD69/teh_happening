from django.db import models

from event.models import Event


class Chat(models.Model):
    event = models.ForeignKey(
        Event,
        blank=False,
        null=False,
        on_delete=models.CASCADE,
        related_name='chats'
    )

    username = models.CharField(
        max_length=32,
        null=False,
        blank=False
    )

    message = models.CharField(
        max_length=512
    )

    datetime = models.DateTimeField(auto_now_add=True)
