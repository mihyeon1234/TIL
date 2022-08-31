from django.db import models

# Create your models here.
# id 는 장고가 알아서 만들어줌, 따른 값들만 테이블 뼈대(스키마) 만들면됨
class Article(models.Model):
   title = models.CharField(max_length = 10)
   content = models.TextField()
   # auto_now_add 는 최초 생성 일자
   created_at = models.DateTimeField(auto_now_add=True)
   # auto_now 는 최종 수정 일자
   updated_at = models.DateTimeField(auto_now=True)
   def __str__(self):
    return self.title
