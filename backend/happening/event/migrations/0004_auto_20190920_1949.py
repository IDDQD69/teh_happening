# Generated by Django 2.2.5 on 2019-09-20 19:49

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('event', '0003_participant'),
    ]

    operations = [
        migrations.AlterField(
            model_name='participant',
            name='event',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='event.Event'),
        ),
    ]
