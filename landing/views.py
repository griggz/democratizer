from .models import Feedback
from rest_framework import generics, permissions, pagination
from rest_framework.response import Response
from .permissions import IsOwnerOrReadOnly
from django.contrib.auth.models import User
from .serializers import FeedbackSerializer


class FeedbackPageNumberPagination(pagination.PageNumberPagination):
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


class FeedbackDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset            = Feedback.objects.all()
    serializer_class    = FeedbackSerializer
    lookup_field        = 'id'
    permission_classes  = [IsOwnerOrReadOnly]

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context


class FeedbackListCreateAPIView(generics.ListCreateAPIView):
    queryset            = Feedback.objects.all()
    serializer_class    = FeedbackSerializer
    permission_classes  = [permissions.AllowAny]
    pagination_class    = FeedbackPageNumberPagination

    def perform_create(self, serializer):
        anon = User.objects.get(username='anon')
        if self.request.user.is_anonymous is True:
            try:
                serializer.save(user=anon)
            except:
                print('anon user doesnt exist, create them.')
        else:
            serializer.save(user=self.request.user)

