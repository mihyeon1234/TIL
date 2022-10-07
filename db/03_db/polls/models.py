from django.db import models

# Create your models here.
class Poll(models.Model):
    title = models.CharField(max_length=30)
    issuea = models.CharField()
    issueb = models.CharField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Comment(models.Model):
    poll = models.ForeignKey(Poll, on_delete=models.CASCADE)
    pick =  models.CharField()
    contect = models.CharField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    # def __str__(self):
    #     return self.content