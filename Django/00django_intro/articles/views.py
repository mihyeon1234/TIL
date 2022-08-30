from html.entities import name2codepoint
import random
from django.shortcuts import render

# Create your views here.
def index(request):
    return render(request, 'index.html')

def greeting(request):
    foods = ['apple','banana','coconut',]
    info ={'name':'Mihyeon'}
    context = {
        'aaa' : foods,
        'info' : info
    }
    return render(request, 'greeting.html', context)

def dinner(request):
    foods =['족발','햄버거','치킨','초밥',]
    pick = random.choice(foods)
    context = {
        'foods':foods,
        'pick':pick
    }
    return render(request, 'dinner.html', context)

def throw(request):
    return render(request, 'throw.html')

def catch(request):
    # print(request)
    # print(type(request))
    # print(request.GET)
    message = request.GET.get('message')
    context={
        'message':message
    }
    return render(request, 'catch.html', context)

def hello(request, name):
    context={
        'name':name2codepoint
    }
    return render(request, 'hello.html', context)
