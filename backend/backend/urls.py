
from django.contrib import admin
from django.urls import include, path, re_path as url

urlpatterns = [
    path('admin/', admin.site.urls),
     url(r'^',include('Modals.urls'))
]