# Generated by Django 2.2.5 on 2019-09-20 19:47

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('event', '0002_event_created_by'),
    ]

    operations = [
        migrations.CreateModel(
            name='Participant',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(max_length=32)),
                ('status', models.SmallIntegerField(choices=[(0, 'pending'), (1, 'yes'), (2, 'maybe'), (3, 'no')], default=0)),
                ('event', models.ForeignKey(editable=False, on_delete=django.db.models.deletion.CASCADE, to='event.Event')),
            ],
        ),
    ]