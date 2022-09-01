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
  title = request.POST.get('title')
  content = request.POST.get('content')
  # print("서버도착", title, content)
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
  # create 페이지가 굳이 필요 없음으로 없애고 테이블 값을 입력받은 후
  # index 페이지로 바로 이동
  return redirect('articles:detail', article.pk)

def detail(request, pk):
    article = Article.objects.get(pk=pk)
    context = {
        'article' : article,
      }
    return render(request, 'articles/detail.html', context)

    # return redirect('articles:detail', article.pk)

def delete(request, pk):
  article = Article.objects.get(pk=pk)
  article.delete()
  return redirect('articles:index')

def edit(request, pk):
  article = Article.objects.get(pk=pk)
  context = {
    'article' : article,
  }
  return render(request, 'articles/edit.html', context)

def update(request, pk):
  article = Article.objects.get(pk=pk)
  article.title = request.POST.get('title')
  article.content = request.POST.get('content')
  article.save()
  return redirect('articles:detail', article.pk)

