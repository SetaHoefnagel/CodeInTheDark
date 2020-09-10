from rest_framework import serializers
from rest_framework.fields import ListField
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

from codeinthedark.models import Room, Contestant

from knox.models import AuthToken


class StringArrayField(ListField):
    """
    String representation of an array field.
    """
    def to_representation(self, obj):
        # convert string to list
        return [x.strip() for x in str(obj).split(',')]

    def to_internal_value(self, data):
        data = data.split(",")  # convert string to list
        return super().to_internal_value(self, data)


class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(validated_data['username'],
                                        None,
                                        validated_data['password'])
        return user


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username')


class LoginUserSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Unable to log in with provided credentials.")


class CreateRoomSerializer(serializers.Serializer):
    max_contestants = serializers.IntegerField()
    time_limit = serializers.IntegerField()


class ContestantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contestant
        fields = ['id', 'username']


class RoomListSerializer(serializers.ModelSerializer):
    contestants = ContestantSerializer(many=True, read_only=True)
    website_image = serializers.SerializerMethodField()

    def get_website_image(self, obj):
        return obj.website_image.url

    class Meta:
        model = Room
        fields = ('id', 'contestants',  'max_contestants', 'time_limit', 'code', 'completed', 'start_time', 'website', 'website_image')



