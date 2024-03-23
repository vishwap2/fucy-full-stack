from django.db import models
from django.db.models import Model
from django.contrib.postgres.fields import ArrayField

# Create your models here.
class Part(models.Model):
    id = models.CharField(max_length=80, primary_key=True)
    name = models.CharField(max_length=80)
    bgColor = models.CharField(max_length=80, default='#0000')
    type = models.CharField(max_length=70, default='receiver')
    # properties = ArrayField(models.CharField(max_length=20))