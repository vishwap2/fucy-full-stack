# Generated by Django 4.2.11 on 2024-03-23 02:47

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Part',
            fields=[
                ('id', models.CharField(max_length=80, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=80)),
                ('bgColor', models.CharField(default='#0000', max_length=80)),
                ('type', models.CharField(default='receiver', max_length=70)),
            ],
        ),
    ]
