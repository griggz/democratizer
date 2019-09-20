from django.contrib.auth import get_user_model

from rest_framework import serializers

from .models import Results, Yelp, Analytics

User = get_user_model()


class UserPublicSerializer(serializers.ModelSerializer):
    username = serializers.CharField(required=False, allow_blank=True,
                                     read_only=True)

    class Meta:
        model = User
        fields = [
            'username'
        ]


class AnalyticsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Analytics
        fields = (
            'word',
            'value',
        )


class ResultsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Results
        fields = (
            'author',
            'date',
            'rating',
            'review'
        )


class ScrapeSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(
        view_name='scrape-api:detail',
        lookup_field='slug'
    )
    user = UserPublicSerializer(read_only=True)
    reviews = ResultsSerializer(many=True, read_only=True)
    analytics = AnalyticsSerializer(many=True, read_only=True)
    owner = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Yelp
        fields = (
            'user',
            'owner',
            'url',
            'business_name',
            'link',
            'page_amount',
            'scrape_date',
            'slug',
            'analytics',
            'reviews',
        )

        @staticmethod
        def create(validated_data):
            return Yelp.objects.create(**validated_data)

    def get_owner(self, obj):
        request = self.context['request']
        if request.user.is_authenticated:
            if request.user == request.user:
                return True
        return False
