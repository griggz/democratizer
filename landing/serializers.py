from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Feedback

User = get_user_model()


class UserPublicSerializer(serializers.ModelSerializer):
    username = serializers.CharField(required=False, allow_blank=True,
                                     read_only=True)

    class Meta:
        model = User
        fields = [
            'username'
        ]


class FeedbackSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(
        view_name='landing-api:detail',
        lookup_field='id'
    )
    user = UserPublicSerializer(read_only=True)

    class Meta:
        model = Feedback
        fields = (
            'url',
            'id',
            'user',
            'name',
            'email',
            'phone_number',
            'comments',
            'timestamp'
        )

        @staticmethod
        def create(validated_data):
            return Feedback.objects.create(**validated_data)

    def get_owner(self, obj):
        request = self.context['request']
        if request.user.is_authenticated:
            if request.user == request.user:
                return True
        return False
