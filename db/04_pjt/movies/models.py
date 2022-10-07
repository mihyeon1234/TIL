from django.db import models

# Create your models here.

class Movie(models.Model):
    title = models.CharField(max_length=20)
    audience = models.IntegerField()
    release_date = models.DateField()
    GENRE_CHOICES = (('코미디','코미디'), ('공포', '공포'), ('멜로', '멜로'))
    genre = models.CharField(max_length=30, choices=GENRE_CHOICES)
    score = models.FloatField()
    poster_url = models.TextField()
    description = models.TextField()