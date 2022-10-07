from django import forms
from polls.models import Poll, Comment


class PollForm(forms.ModelForm):

    class Meta:
        model = Poll
        fields = '__all__'


class CommentForm(forms.ModelForm):

    class Meta:
        model = Comment
        fields = '__all__'
        # exclude = ('poll',)
