from tkinter import Widget
from django import forms
from movies.models import Movie


class MovieForm(forms.ModelForm):
    release_date = forms.DateField(
        widget=forms.DateInput(
            attrs = {
                'class':'form-control', 
                'placeholder':'Select a date', 
                'type':'date'
            }
        )
    )


    class Meta:
        model = Movie
        fields = '__all__'
        