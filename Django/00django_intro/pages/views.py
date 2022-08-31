from django.shortcuts import render
from pydoc import render_doc

# Create your views here.
def index(request):
  return render(request, 'pages/index.html')
