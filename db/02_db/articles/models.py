from django.db import models
from django.conf import settings

# Create your models here.
class Article(models.Model):
    # User 모델을 참조할때 model.py 에서만 settings.AUTH_USER_MODEL 로 참조하고
    # 다른 모든 곳에서는 get_user_model()로 참조함
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    title = models.CharField(max_length=15)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    # def __str__(self):
    #     return self.title

class Comment(models.Model):
# 어디를 참조하는지, on_delete 는 외래키가 참조하는 객체가 사라졌을때 어떻게 처리할지(무결성 원칙 땜에 중요한 설정임)
# CASCADE 는 부모객체(참조된) 가 사라졋을때 이를 참조하는 객체도 삭제
    article = models.ForeignKey(Article, on_delete=models.CASCADE)      # 어떤 게시물에 관한 댓글인지
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)        # 누가 쓴 댓글인지
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.content

# 모델에 변동사항이 생기면 migration 과정 진행
# python manage.py makemigrations
# python manage.py migrate
# python manage.py shell_plus 입력하면 파이썬 코드 한줄씩 입력해서 실행 가능(데이터 추가할때)