from django.urls import path
from . import views


urlpatterns = [
<<<<<<< HEAD
=======
    path('articles/', views.article_list),
    path('articles/<int:article_pk>/', views.article_detail),
    path('comments/', views.comment_list),
    path('comments/<int:comment_pk>/', views.comment_detail),
    path('articles/<int:article_pk>/comments/', views.comment_create),
>>>>>>> caec6716b679e379072aff9bdc3495ebcece383a
]
