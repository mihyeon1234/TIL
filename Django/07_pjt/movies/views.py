from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from django.shortcuts import get_list_or_404, get_object_or_404
from movies.serializers import ActorListSerializer, ActorSerializer, MoiveSerializer, MovieListSerializer, ReviewDetailSerializer, ReviewSerializer
from movies.models import Actor, Movie, Review
# Create your views here.

# 전체 배우 목록 제공 
@api_view(['GET'])
def actors_list(request):
    actors = get_list_or_404(Actor)
    serializer = ActorListSerializer(actors, many=True)
    return Response(serializer.data)

# 전체 영화 목록 제공
@api_view(['GET'])
def movies_list(request):
    movies = get_list_or_404(Movie)
    serializers = MovieListSerializer(movies, many=True)
    return Response(serializers.data)

# 단일 배우 정보 제공
@api_view(['GET'])
def actors_detail(request, movie_pk):
    movie = get_object_or_404(Actor, pk=movie_pk)
    serializer = ActorSerializer(movie)
    return Response(serializer.data)

# 단일 영화 정보 제공
@api_view(['GET'])
def movie_detail(request, movie_pk):
    movie = get_object_or_404(Movie, pk = movie_pk)
    serializer = MoiveSerializer(movie)
    return Response(serializer.data)

# 전체 리뷰 목록 제공
@api_view(['GET'])
def review_list(request):
    review = get_list_or_404(Review)
    serializers = ReviewSerializer(review, many=True)
    return Response(serializers.data)
    
# 단일 리뷰 조회 & 수정 & 삭제

@api_view(['GET','PUT','DELETE'])
def review_detail(request, review_pk):
    review = get_object_or_404(Review, pk=review_pk)

    if request.method == 'GET':
        serializers = ReviewDetailSerializer(review, many=True)
        return Response(serializers.data)
    elif request.method == 'DELETE':
        review.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    elif request.method == 'PUT':
        serializers = ReviewDetailSerializer(review, data=request.data)
        if serializers.is_valid(raise_exception=True):
            serializers.save()
            return Response(serializers.data)

@api_view(['POST'])
def review_create(request, movie_pk):
    movie = get_object_or_404(Movie, pk=movie_pk)
    serializer = ReviewDetailSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        serializer.save(movie=movie)
        return Response(serializer.data, status=status.HTTP_201_CREATED)