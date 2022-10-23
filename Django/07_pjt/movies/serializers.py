from rest_framework import serializers
from movies.models import Actor, Movie, Review

# 배우 전체 리스트 불러오기
class ActorListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Actor
        fields = '__all__'

# 영화 전체 리스트 불러오기
class MovieListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = ('title','overview',)

# 단일 배우 관련 정보 제공을 위한 영화 제목만 불러오기
class MovieSerializer_forActor(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields =  ('title',)


# 단일 배우 정보 제공
class ActorSerializer(serializers.ModelSerializer):
    movie_set = MovieSerializer_forActor(many=True, read_only=True)
    class Meta:
        model = Actor
        fields='__all__'

# 리뷰 전체 리스트 불러오기
class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ('title','content',)

# 단일 영화 정보 제공
class MoiveSerializer(serializers.ModelSerializer):
    actors = ActorListSerializer(many=True, read_only = True)
    review_set = ReviewSerializer(many=True, read_only=True)
    class Meta:
        model = Movie
        fields='__all__'

# 단일 리뷰 조회 수정 삭제
class ReviewDetailSerializer(serializers.ModelSerializer):  
    movie = MovieSerializer_forActor(read_only = True)
    class Meta:
        model = Review
        fields='__all__'
        read_only_fields=('movie',)
