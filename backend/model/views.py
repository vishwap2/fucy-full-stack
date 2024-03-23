from django.shortcuts import render
from rest_framework.views import APIView
from . models import *
from .serializer import *
from rest_framework.response import Response

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
    def delete(request, id):
        part = Part.objects.get(id=id)
        part.delete()

# class TemplateView(APIView):
#     def get(self,request):
#         output=[{"id":output.id }
#                 for output in Part.objects.all()]
#         return Response(output)
#     def post(self,request):
#         serializer=PartSerializer(data=request.data)
#         if serializer.is_valid(raise_exception=True):
#             serializer.save()
#             return Response(serializer.data)
#         else:
#             print(serializer.errors)
#     def delete(request, id):
#         part = Part.objects.get(id=id)
#         part.delete()

# class TemplateView(APIView):
#     def get(self,request):
#         output=[{"name": output.name, "id":output.id }
#                 for output in Part.objects.all()]
#         return Response(output)
#     def post(self,request):
#         serializer=PartSerializer(data=request.data)
#         if serializer.is_valid(raise_exception=True):
#             serializer.save()
#             return Response(serializer.data)
#         else:
#             print(serializer.errors)
#     def delete(request, id):
#         part = Part.objects.get(id=id)
#         part.delete()

# Create your views here.