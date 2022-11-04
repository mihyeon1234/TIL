from rest_framework import serializers
from movies.models import Movie

# 영화 전체 리스트 불러오기
class MovieListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = ('title','overview',)