# Generated by Django 2.1.5 on 2020-02-28 13:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('codeinthedark', '0002_auto_20200228_1432'),
    ]

    operations = [
        migrations.AlterField(
            model_name='room',
            name='contestants',
            field=models.ManyToManyField(blank=True, null=True, to='codeinthedark.Contestant'),
        ),
    ]