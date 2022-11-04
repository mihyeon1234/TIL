from django.shortcuts import render
import random

from django.views.decorators.http import require_safe
from movies.models import Movie


# Create your views here.
@require_safe
def index(request):
    movies = Movie.objects.all()
    context = {
        'movies': movies,
    }
    return render(request, 'movies/index.html', context)


@require_safe
def detail(request, movie_pk):
    movie = Movie.objects.get(pk=movie_pk)
    context = {
       'movie': movie,
    }
    return render(request,'movies/detail.html', context)
    pass



@require_safe
def recommended(request):
    movies = random.sample(list(Movie.objects.all()),10)
    print(movies)
    context = {
       'movies': movies,
    }

    return render(request, 'movies/recommended.html', context)
    pass