from .models import Comms
from rest_framework import generics, permissions, pagination
from rest_framework.response import Response
from .permissions import IsOwnerOrReadOnly
from .serializers import CommsSerializer


# New methods for REACT-JS
class CommsPageNumberPagination(pagination.PageNumberPagination):
    page_size = 5
    page_size_query_param = 'size'
    max_page_size = 20

    def get_paginated_response(self, data):
        author = False
        user = self.request.user
        if user.is_staff:
            staff = True
        else:
            staff = False
        context = {
            'next': self.get_next_link(),
            'previous': self.get_previous_link(),
            'count': self.page.paginator.count,
            'staff': staff,
            'results': data,
        }
        return Response(context)


class CommsDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset            = Comms.objects.all()
    serializer_class    = CommsSerializer
    lookup_field        = 'slug'
    permission_classes  = [IsOwnerOrReadOnly]

    # def get_serializer_context(self):
    #     context = super().get_serializer_context()
    #     context['request'] = self.request
    #     return context


class CommsListCreateAPIView(generics.ListCreateAPIView):
    queryset            = Comms.objects.all()
    serializer_class    = CommsSerializer
    permission_classes  = [permissions.IsAuthenticatedOrReadOnly]
    pagination_class    = CommsPageNumberPagination

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


