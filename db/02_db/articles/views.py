from django.shortcuts import render, redirect
from django.views.decorators.http import require_http_methods, require_POST, require_safe
from django.contrib.auth.decorators import login_required

import articles
from .models import Article, Comment
from .forms import ArticleForm, CommentForm


# Create your views here.
@require_safe
def index(request):
    articles = Article.objects.all()
    context = {
        'articles': articles,
    }
    return render(request, 'articles/index.html', context)


@login_required
@require_http_methods(['GET', 'POST'])
def create(request):
    if request.method == 'POST':
        form = ArticleForm(request.POST)
        if form.is_valid():
            article = form.save(commit=False)
            article.user = request.user
            article = form.save()
            return redirect('articles:detail', article.pk)
    else:
        form = ArticleForm()
    context = {
        'form': form,
    }
    return render(request, 'articles/create.html', context)


@require_safe
def detail(request, pk):
    article = Article.objects.get(pk=pk)
    comment_form = CommentForm()
    comments = article.comment_set.all()       # 게시글에 해당되는 모든 댓글 가져오기
    context = {
        'article': article,
        'comment_form': comment_form,
        'comments' : comments,
    }
    return render(request, 'articles/detail.html', context)



@require_POST
def delete(request, pk):
    article = Article.objects.get(pk=pk)
    if request.user.is_authenticated:
        if request.user == article.user:        # 게시글 작성 유저랑, 지금 로그인한 유저가 같다면
            article.delete()
            return redirect('articles:index')
    return redirect('articles:index', article.pk)


@login_required
@require_http_methods(['GET', 'POST'])
def update(request, pk):
    article = Article.objects.get(pk=pk)
    if request.user == article.user:
        if request.method == 'POST':
            form = ArticleForm(request.POST, instance=article)
            # form = ArticleForm(data=request.POST, instance=article)
            if form.is_valid():
                form.save()
                return redirect('articles:detail', article.pk)
        else:
            form = ArticleForm(instance=article)
    else:
        return redirect('articles:index')
    context = {
        'form': form,
        'article': article,
    }
    return render(request, 'articles/update.html', context)


def comments_create(request, pk):
    article = Article.objects.get(pk=pk)
    comment_form = CommentForm(request.POST)
    if comment_form.is_valid():
        comment = comment_form.save(commit=False) # 저장은 안하고 save에서 나오는 데이터를 comment에 불러오기 save메서드 commit 기본값음 TRUE임
        comment.user = request.user     # 댓글 작성시 user 값을 자동으로 할당
        comment.article = article       # 댓글 작성시 article 값, 어떤 게시물의 댓글인지를 자동으로 할당
        comment.save()
    return redirect('articles:detail', article.pk)

def comments_delete(request, article_pk, comment_pk):
    comment = Comment.objects.get(pk = comment_pk)
    if request.user == comment.user:
        comment.delete()
    return redirect('articles:detail',article_pk)
