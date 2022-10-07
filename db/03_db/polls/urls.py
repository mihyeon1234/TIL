from django.urls import path
from polls import views


app_name = 'articles'
urlpatterns = [
    path('', views.index, name='index'),
]
