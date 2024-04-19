from rest_framework import serializers
from.models import *


class PartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Part
        fields = ['id','name']