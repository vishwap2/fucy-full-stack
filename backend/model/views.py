from django.shortcuts import render
from rest_framework.views import APIView
from . models import *
from .serializer import *
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
import json

class PartView(APIView):
    def get(self,request):
        output=[{"name": output.name, "id":output.id }
                for output in Part.objects.all()]
        return Response(output)
    def post(self,request):
        serializer=PartSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
        else:
            print(serializer.errors)

# Create your views here.