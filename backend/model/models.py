from django.db import models
from django.db.models import Model

# Create your models here.
class Part(models.Model):
    # data = (models.CharField(max_length=30), models.CharField(max_length=30))
    # bgcolor = 
    id = models.CharField(max_length=80, primary_key=True)
    name = models.CharField(max_length=80)