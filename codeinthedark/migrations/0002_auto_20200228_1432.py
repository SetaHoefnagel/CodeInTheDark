# Generated by Django 2.1.5 on 2020-02-28 13:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('codeinthedark', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Contestant',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(max_length=64)),
                ('ip', models.CharField(max_length=64)),
            ],
        ),
        migrations.RemoveField(
            model_name='room',
            name='contestants',
        ),
        migrations.AddField(
            model_name='room',
            name='contestants',
            field=models.ManyToManyField(to='codeinthedark.Contestant'),
        ),
    ]