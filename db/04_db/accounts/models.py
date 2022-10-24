from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
    # symmetrical 이 True 면 팔로우가 아니라 맞팔 됨
    followings = models.ManyToManyField('self', symmetrical=False, related_name='followers')
