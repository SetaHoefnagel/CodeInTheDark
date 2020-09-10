# Generated by Django 2.2.10 on 2020-09-10 13:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('codeinthedark', '0003_auto_20200228_1437'),
    ]

    operations = [
        migrations.AddField(
            model_name='room',
            name='website',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='room',
            name='website_image',
            field=models.FileField(blank=True, null=True, upload_to='websites/'),
        ),
    ]
