from django.contrib.auth import get_user_model, authenticate, login, logout
from rest_framework import serializers
from .models import Comms

User = get_user_model()


class UserPublicSerializer(serializers.ModelSerializer):
    username = serializers.CharField(required=False, allow_blank=True,
                                     read_only=True)

    class Meta:
        model = User
        fields = [
            'username',
            'first_name',
            'last_name',
        ]


class CommsSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(
        view_name='comms-api:detail',
        lookup_field='slug'
    )
    author = UserPublicSerializer(read_only=True)
    owner = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Comms
        fields = [
            'url',
            'site_location',
            'title',
            'slug',
            'author',
            'owner',
            'content',
            'updated',
            'draft'
        ]

    def get_owner(self, obj):
        request = self.context['request']
        if request.user.is_authenticated:
            if obj.author == request.user:
                return True
        return False
