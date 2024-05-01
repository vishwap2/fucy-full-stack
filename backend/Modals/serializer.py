from rest_framework import serializers
from Modals.models import Component

class ComponentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Component
        fields=('id','name')