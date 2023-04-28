from blog.models import Post,Tag,Profile
from django.contrib.auth.models import User
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','username','first_name','last_name']

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id','name']

class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = Profile
        fields = ['id','website','bio','user']
        
class PostSerializer(serializers.ModelSerializer):
    tags = TagSerializer(many=True)
    author = ProfileSerializer()
  #  author = serializers.StringRelatedField()
    class Meta:
        model = Post
        fields = ['id','title','subtitle','slug','body','meta_description','date_created','publish_date','published','author','tags']




