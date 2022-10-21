from django.urls import path
from movies import views

app_name = 'movies'
urlpatterns = [
    path('actors/', views.actors_list),
    path('actors/<int:movie_pk>/', views.actors_detail),
    path('movies/', views.movies_list),
    path('movies/<int:movie_pk>/', views.movie_detail),
    path('review/', views.review_list),
    path('review/<int:review_pk>/', views.review_detail),
    path('movies/<int:movie_pk>/review', views.review_create),
]
