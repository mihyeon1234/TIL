from django.urls import path
# from . 으로 pages인 같은 폴더에 있는 views를 갖고옴
from pages import views

app_name = 'pages'
urlpatterns = [
    path('index/', views.index, name='index')
]
