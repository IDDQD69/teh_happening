from django.db import models

from event.models import Event


class Comment(models.Model):
    event = models.ForeignKey(
        Event,
        blank=False,
        null=False,
        on_delete=models.CASCADE,
        related_name='comments'
    )

    parent_comment = models.ForeignKey(
        'self',
        blank=True,
        null=True,
        related_name='subcomments',
        on_delete=models.CASCADE
    )

    comment = models.CharField(
        max_length=1024
    )

    username = models.CharField(
        max_length=32,
        null=False,
        blank=False
    )

    comment = models.CharField(
        max_length=1024
    )

    datetime = models.DateTimeField(auto_now_add=True)
