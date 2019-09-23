from rest_framework import generics, permissions, pagination
from rest_framework.response import Response
from .permissions import IsOwnerOrReadOnly
from django.contrib.auth.models import User
from .serializers import ScrapeSerializer, IndeedScrapeSerializer
# from .scripts.text_analysis.analyze_text import ProcessCommon
from .pipeline import *


class ScrapePageNumberPagination(pagination.PageNumberPagination):
    page_size = 5
    page_size_query_param = 'size'
    max_page_size = 20

    def get_paginated_response(self, data):
        user = False
        user = self.request.user
        if user.is_authenticated:
            user = True
        context = {
            'next': self.get_next_link(),
            'previous': self.get_previous_link(),
            'count': self.page.paginator.count,
            'user': user,
            'results': data,
        }
        return Response(context)


class ScrapeDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Collect.objects.all()
    # serializer_class = ScrapeSerializer
    lookup_field = 'slug'
    permission_classes = [IsOwnerOrReadOnly]

    def get_serializer_class(self):
        if 'yelp' in self.request.path:
            return ScrapeSerializer
        elif 'indeed' in self.request.path:
            return IndeedScrapeSerializer
        return -1  #

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context


class ScrapeListCreateAPIView(generics.ListCreateAPIView):
    permission_classes = [permissions.AllowAny]
    pagination_class = ScrapePageNumberPagination

    def get_queryset(self):
        if 'yelp' in self.request.path:
            queryset = Collect.objects.filter(site='yelp')
            return queryset
        elif 'indeed' in self.request.path:
            queryset = Collect.objects.filter(site='indeed')
            return queryset
        return -1  #

    def get_serializer_class(self):
        if 'yelp' in self.request.path:
            return ScrapeSerializer
        elif 'indeed' in self.request.path:
            return IndeedScrapeSerializer
        return -1  #

    def perform_create(self, serializer):
        anon = User.objects.get(username='scrapeAnon')
        if self.request.user.is_anonymous is True:
            serializer.save(user=anon)
        else:
            serializer.save(user=self.request.user)

        run_flow(serializer.instance)


