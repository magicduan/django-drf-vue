from django.shortcuts import render
from django.contrib.auth.models import User
from blog.models import Post,Tag,Profile
from rest_framework import  viewsets,permissions,filters
from blog.serializers import PostSerializer,TagSerializer,ProfileSerializer
from django_filters.rest_framework import DjangoFilterBackend

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all().order_by('publish_date')
    serializer_class = PostSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['tags__name','slug','author__user__username']
    # def get_queryset(self):
    #     tag = self.request.query_params.get('tag')
    #     if tag is not None:
    #         return Post.objects.filter(tags__name=tag)
    #     return super().get_queryset()
    # # filter_backends = [filters.SearchFilter]
    # # search_fields = ['tags__name','slug']
#    permission_classes = [permissions.IsAuthenticated]


class TagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer

class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['user__username']