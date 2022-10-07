from django.db import models

# Create your models here.
class Poll(models.Model):
    title = models.CharField(max_length=30)
    issuea = models.CharField(max_length=30)
    issueb = models.CharField(max_length=30)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Comment(models.Model):
    poll = models.ForeignKey(Poll, on_delete=models.CASCADE)
    choice_color =  (('1','BLUE'),('2','RED'))
    pick = models.CharField(max_length=10, choices=choice_color)
    contect = models.CharField(max_length=30)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    # def __str__(self):
    #     return self.content