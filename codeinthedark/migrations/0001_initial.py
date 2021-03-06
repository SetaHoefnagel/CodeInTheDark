# Generated by Django 2.1.3 on 2020-01-31 00:35

import codeinthedark.models
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Room',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('contestants', models.CharField(blank=True, max_length=1024, null=True)),
                ('max_contestants', models.IntegerField()),
                ('time_limit', models.IntegerField()),
                ('code', models.CharField(default=codeinthedark.models.generate_room_code, max_length=1024)),
                ('completed', models.BooleanField(default=False)),
                ('start_time', models.DateTimeField(blank=True, null=True)),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
