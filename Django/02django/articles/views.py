from django.shortcuts import render, redirect
from .models import Article

# Create your views here.
def index(request):
  articles = Article.objects.all()
  context = {
    'articles' : articles
  }
  return render(request, 'articles/index.html', context)

def new(request):
  return render(request, 'articles/new.html')

def create(request):
  title = request.GET.get('title')
  content = request.GET.get('content')

  #DB에 저장
  #1
  # article = Article()
  # article.title = title
  # article.content = content
  # article.save()

  #2  2번째 방법이 가장 좋음(save전에 유효성 검증 코드 넣을꺼임)
  article = Article(title = title, content = content)
  article.save()

  #3
  # Article.objects.create(title = title, content = content)
  # return render(request, 'articles/create.html')
  return redirect('articles:index')
