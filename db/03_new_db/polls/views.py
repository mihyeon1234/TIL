from django.shortcuts import render,redirect
from polls.models import Poll
from polls.forms import PollForm, CommentForm

# Create your views here.
def index(request):
    polls = Poll.objects.all()
    context = {
        'polls' : polls,
    }
    return render(request, 'polls/index.html', context)

def create(request):
    if request.method == 'POST':
        form = PollForm(request.POST)
        if form.is_valid():
            poll = form.save(commit=False)
            poll = form.save()
            return redirect('polls:detail', poll.pk)
    else:
        form = PollForm()
    context = {
        'form': form,
    }
    return render(request, 'polls/create.html', context)

def detail(request, pk):
    poll = Poll.objects.get(pk=pk)
    comment_form = CommentForm()
    comments = poll.comment_set.all()       # 게시글에 해당되는 모든 댓글 가져오기
    context = {
        'poll': poll,
        'comment_form': comment_form,
        'comments' : comments,
    }
    return render(request, 'polls/detail.html', context)


def comments_create(request, pk):
    poll = Poll.objects.get(pk=pk)      # 어떤 게시물에 대한 댓글인지 먼저 불러오기
    comment_form = CommentForm(request.POST)
    if comment_form.is_valid():
        comment = comment_form.save(commit=False) # 저장은 안하고 save에서 나오는 데이터를 comment에 불러오기 save메서드 commit 기본값음 TRUE임
        comment.poll = poll       # 댓글 작성시 poll 값, 어떤 게시물의 댓글인지를 자동으로 할당
        comment.save()
    return redirect('polls:detail', poll.pk)

def delete(request, pk):
    poll = Poll.objects.get(pk=pk)
    poll.delete()
    return redirect('polls:index')
