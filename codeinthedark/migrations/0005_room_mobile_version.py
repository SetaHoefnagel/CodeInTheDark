# Generated by Django 2.2.10 on 2020-09-10 14:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('codeinthedark', '0004_auto_20200910_1540'),
    ]

    operations = [
        migrations.AddField(
            model_name='room',
            name='mobile_version',
            field=models.BooleanField(default=False),
        ),
    ]