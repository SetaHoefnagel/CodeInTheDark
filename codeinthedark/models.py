from django.db import models
from uuid import uuid4
import random
from django.contrib.auth.models import User

def generate_room_code():
    return '%016x' % random.randrange(16 ** 16)


# Create your models here.
class Room(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    contestants = models.ManyToManyField('Contestant', blank=True, null=True)
    max_contestants = models.IntegerField()
    time_limit = models.IntegerField()
    code = models.CharField(default=generate_room_code, max_length=1024)
    completed = models.BooleanField(default=False)
    start_time = models.DateTimeField(blank=True, null=True)


class Contestant(models.Model):
    username = models.CharField(max_length=64)
    ip = models.CharField(max_length=64)

    def __str__(self):
        return self.username