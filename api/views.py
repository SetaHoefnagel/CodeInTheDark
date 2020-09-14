from django.shortcuts import get_object_or_404
from rest_framework import viewsets, permissions, generics
from rest_framework.response import Response

from knox.models import AuthToken
from knox.auth import TokenAuthentication

from codeinthedark.models import Room

from .serializers import *

import datetime, threading, time


class RegistrationAPI(generics.GenericAPIView):
    serializer_class = CreateUserSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        token = AuthToken.objects.create(user)
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": token[1],
            "refresh": token[0].digest
        })


class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginUserSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        token = AuthToken.objects.create(user)
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": token[1],
            "refresh": token[0].digest
        })

class UserAPI(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user


class CreateRoomAPI(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = CreateRoomSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        print(serializer.data)

        room = Room.objects.create(max_contestants=serializer.data.get('max_contestants'),
                                   time_limit=serializer.data.get('time_limit') * 60,
                                   owner=request.user,
                                   website=serializer.data.get('website_url')
                                   )

        return Response({
            'success': True,
            'message': 'The room has been created'
        })


class AuthenticatedListAPI(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated, ]

    def list(self, request):
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)


class RoomListAPI(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = RoomListSerializer

    def list(self, request):
        queryset = Room.objects.filter(owner=request.user)
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)
