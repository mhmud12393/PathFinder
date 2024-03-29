# Generated by Django 5.0.1 on 2024-01-17 17:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('calculator', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='devicepoint',
            name='best_link_power',
        ),
        migrations.RemoveField(
            model_name='devicepoint',
            name='best_link_station',
        ),
        migrations.AlterField(
            model_name='devicepoint',
            name='x',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='devicepoint',
            name='y',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='linkstation',
            name='r',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='linkstation',
            name='x',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='linkstation',
            name='y',
            field=models.IntegerField(),
        ),
    ]
