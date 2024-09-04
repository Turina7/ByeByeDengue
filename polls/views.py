from django.shortcuts import render

from django.http import HttpResponse

from .pages.homepage.homepage import get_homepage_view


def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")

def homepage(request):
    return get_homepage_view(request)