from django.urls import re_path as url
from Modals import views


urlpatterns=[
    url(r'^component$',views.componentApi),
    url(r'^component/([0-9]+)$',views.componentApi)
]  