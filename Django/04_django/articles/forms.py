from django import forms
from .models import Article
# class ArticleForm(forms.Form):
#     # 드랍다운
#     NATION_A = 'kr'
#     NATION_B = 'ch'
#     NATION_C = 'jp'
#     NATION_CHOICES = [
#         (NATION_A, '한국'),
#         (NATION_B, '중국'),
#         (NATION_C, '일본'),

#     ]
#     title = forms.CharField(max_length=10)
#     content = forms.CharField(widget=forms.Textarea)
#     nation = forms.ChoiceField(choices=NATION_CHOICES)

class ArticleForm(forms.ModelForm):
    title = forms.CharField(
        label = '제목',
        widget = forms.TextInput(
            attrs={ # 속성값은 dict안에 넣어야됨
                'class':'my-title',
                'placeholder' : 'Enter the title', # 인풋창 안에 회색 안내 글자
                'maxlenght' : 10 # 유효성 검사랑 관련없음 입력할때 미리 제한거는거임
            }
        ),
    )
    content = forms.CharField(
        label='내용',
        widget=forms.Textarea(
            attrs={
                'class':'my-content',
                'placeholder':'Enter the content',
                'rows':5,
                'cols':50,
            }
        ),
        error_messages={
            'required':'내용을 입력해'
        }
    )


    class Meta:
        model = Article
        fields = '__all__'
        # titel만 제외하고 가져오기
        # exclude = ('title',)