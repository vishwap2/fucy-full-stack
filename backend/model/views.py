from django.shortcuts import render
from rest_framework.views import APIView
from . models import *
from .serializer import *
from rest_framework.response import Response
from rest_framework import status

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
    def put(self, request, pk):
        try:
            part = Part.objects.get(pk=pk)
        except Part.DoesNotExist:
            return Response({'error': 'Part not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = PartSerializer(instance=part, data=request.data,partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def patch(self, request, pk):
        try:
            part = Part.objects.get(pk=pk)
        except Part.DoesNotExist:
            return Response({'error': 'Part not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = PartSerializer(instance=part, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        

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
        
#     def put(self,request,pk):
#         serializer=PartSerializer(data=request.data)
#         if serializer.is_valid(raise_exception=True):
#             serializer.save()
#             return Response(serializer.data)
#         else:
#             print(serializer.errors)    


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