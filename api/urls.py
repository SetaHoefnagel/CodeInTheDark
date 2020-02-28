"""djangoreact URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.conf.urls import url, include

from .views import (RegistrationAPI, LoginAPI, UserAPI, CreateRoomAPI, RoomListAPI)
from codeinthedark.models import Room


urlpatterns = [
    # url('test/', admin.site.urls),
    # url(r'auth/', include('knox.urls')),
    url("^auth/register/$", RegistrationAPI.as_view()),
    url("^auth/login/$", LoginAPI.as_view()),
    url("^auth/user/$", UserAPI.as_view()),

    url("^rooms/create", CreateRoomAPI.as_view()),
    url("^rooms/list", RoomListAPI.as_view()),
]
