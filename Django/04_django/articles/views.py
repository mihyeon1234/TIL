import re
from django.shortcuts import render, redirect
from .models import Article
from .forms import ArticleForm
from django.views.decorators.http import require_http_methods, require_POST, require_safe


# Create your views here.
@require_safe  # GET일떄만
def index(request):
    # DB에 전체 데이터를 조회
    articles = Article.objects.all()
    context = {
        'articles': articles,
    }
    return render(request, 'articles/index.html', context)


# def new(request):
#     form = ArticleForm()
#     context = {
#         'form' : form,
#     }
#     return render(request, 'articles/new.html', context)

@require_http_methods(['GET','POST'])
def create(request):
    if request.method == 'POST':
        # create
        form = ArticleForm(request.POST)
        if form.is_valid(): # 유효성 검사를 통과하면
            article = form.save()
            return redirect('articles:detail', article.pk)
    else: 
        #new
        form = ArticleForm()
    # POST일때는 에러메세지가 나오고,
    # GET일때는 빈 form이 와서 새로운값이 저장됨
    context = {
        'form' : form,
    }
    return render(request, 'articles/create.html', context)
 
@require_safe # GET일떄만
def detail(request, pk):
    # variable routing으로 받은 pk 값으로 데이터를 조회
    article = Article.objects.get(pk=pk)
    context = {
        'article': article,
    }
    return render(request, 'articles/detail.html', context)

@require_POST #POST일때만
def delete(request, pk):
    if request.method == 'POST':
        article = Article.objects.get(pk=pk)
        article.delete()
    return redirect('articles:index')


@require_http_methods(['GET','POST'])
def update(request, pk):
    if request.method == 'POST':
        article = Article.objects.get(pk=pk)
        form = ArticleForm(request.POST, instance=article)
        # form = ArticleForm(data = request.POST, instance=article) data는 생략가능

        if form.is_valid():
            form.save()
            return redirect('articles:detail', article.pk)

    else: #GET 일때 edit
        article = Article.objects.get(pk=pk)
        form = ArticleForm(instance=article) # 인스턴스 인자를 원래 입력되있던 값으로 줌

    context = {
        'article': article,
        'form' : form,
    }
    return render(request, 'articles/update.html', context)



