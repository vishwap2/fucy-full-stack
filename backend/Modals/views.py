from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

from Modals.models import Component
from Modals.serializer import ComponentSerializer


# Create your views here.
@csrf_exempt
def componentApi(request, id=0):
    if request.method == "GET":
        components = Component.objects.all()
        components_serializer = ComponentSerializer(components, many=True)
        return JsonResponse(components_serializer.data, safe=False)
    elif request.method == "POST":
        component_data = JSONParser().parse(request)
        components_serializer = ComponentSerializer(data=component_data)
        if components_serializer.is_valid():
            components_serializer.save()
            return JsonResponse("Added Successfully", safe=False)
        return JsonResponse("Failed to Add", safe=False)
    elif request.method == "PUT":
        component_data = JSONParser().parse(request)
        component = Component.objects.get(id=component_data["id"])
        components_serializer = ComponentSerializer(
            component, data=component_data)
        if components_serializer.is_valid():
            components_serializer.save()
            return JsonResponse("Updated Successfully", safe=False)
        return JsonResponse("Failed to update")
    elif request.method == "DELETE":
        component = Component.objects.get(id=id)
        component.delete()
        return JsonResponse("Deleted Successfully", safe=False)
