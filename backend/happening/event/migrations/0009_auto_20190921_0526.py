# Generated by Django 2.2.5 on 2019-09-21 02:26

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('event', '0008_auto_20190921_0101'),
    ]

    operations = [
        migrations.AlterField(
            model_name='participant',
            name='event',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='participants', to='event.Event'),
        ),
        migrations.AlterUniqueTogether(
            name='participant',
            unique_together={('event', 'username')},
        ),
    ]
