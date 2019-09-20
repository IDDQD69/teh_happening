from django.contrib.auth.models import User
from django.db import models


class Event(models.Model):
    name = models.CharField(
        max_length=120,
        null=False,
        blank=False
    )

    created_by = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        null=True
    )

    def __str__(self):
        return '%d - %s' % (self.id, self.name)
