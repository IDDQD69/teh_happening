from django.contrib.auth.models import User
from django.db import models


class Event(models.Model):
    name = models.CharField(
        max_length=120,
        null=False,
        blank=False,
        default=None,
    )

    created_by = models.CharField(
        max_length=120,
        null=True,
        blank=True
    )

    TYPE_INVITE = 0
    TYPE_INVITE_LINK = 1
    TYPE_CHOICES = (
        (TYPE_INVITE, 'invite'),
        (TYPE_INVITE_LINK, 'invite by link'),
    )
    event_type = models.SmallIntegerField(
        choices=TYPE_CHOICES,
        null=False,
        default=TYPE_INVITE
    )

    date = models.DateField(null=True, blank=True)

    url = models.CharField(
        max_length=120,
        null=True,
        blank=True,
        default=''
    )

    def __str__(self):
        return '%d - %s' % (self.id, self.name)


class Participant(models.Model):

    event = models.ForeignKey(
        Event,
        blank=False,
        null=False,
        on_delete=models.CASCADE,
        related_name='participants'
    )

    username = models.CharField(
        max_length=32,
        null=False,
        blank=False
    )

    STATUS_PENDING = 0
    STATUS_YES = 1
    STATUS_MAYBE = 2
    STATUS_NO = 3
    STATUS_CHOICES = (
        (STATUS_PENDING, 'pending'),
        (STATUS_YES, 'yes'),
        (STATUS_MAYBE, 'maybe'),
        (STATUS_NO, 'no'),
    )
    status = models.SmallIntegerField(
        choices=STATUS_CHOICES,
        null=False,
        default=STATUS_PENDING
    )

    class Meta:
        unique_together = ('event', 'username',)

    def __str__(self):
        return '%d - %s - %s' % (self.id, self.username, self.event)
