from django.db import models


# Create your models here.
class Part(models.Model):
    id = models.CharField(max_length=80, primary_key=True)
    name = models.CharField(max_length=80, default='default')
