from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import render
<<<<<<< HEAD
=======
from django.http.response import JsonResponse, HttpResponse
from django.core import serializers
>>>>>>> caec6716b679e379072aff9bdc3495ebcece383a
from .serializers import ArticleSerializer
from .models import Article

# Create your views here.
def article_html(request):
    articles = Article.objects.all()
    context = {
        'articles': articles,
    }
    return render(request, 'articles/article.html', context)


def article_json_1(request):
    articles = Article.objects.all()
<<<<<<< HEAD
    pass
=======
    articles_json = []

    for article in articles:
        articles_json.append(
            {
                'id': article.pk,
                'title': article.title,
                'content': article.content,
                'created_at': article.created_at,
                'updated_at': article.updated_at,

            }
        )
    return JsonResponse(articles_json, safe=False)
>>>>>>> caec6716b679e379072aff9bdc3495ebcece383a


def article_json_2(request):
    articles = Article.objects.all()
<<<<<<< HEAD
    pass
=======
    data = serializers.serialize('json', articles)
    return HttpResponse(data, content_type='application/json')
>>>>>>> caec6716b679e379072aff9bdc3495ebcece383a


# @api_view(['GET'])
@api_view()
def article_json_3(request):
    articles = Article.objects.all()
    serializer = ArticleSerializer(articles, many=True)
    return Response(serializer.data)
