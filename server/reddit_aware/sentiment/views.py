from django.shortcuts import render
from django.http import HttpResponse
import json
import requests
# Create your views here.
from .getSentiment import getURLSentiment
from .models import SentDocument


def response(inp):
    url = inp.GET.get('url')

    return HttpResponse(json.dumps(handleRequest(url)))


def handleRequest(url):
    contents = SentDocument.objects.filter(page_id=url)
    if len(contents) == 0:
        return getDoc(url)
    else:
        return contents.first().as_dict()



def getDoc(url):
    sentiment = dict(getURLSentiment(url))
    new = SentDocument.objects.create(page_id=url, score=sentiment['score'], emotion=sentiment['magnitude'])
    new.save()
    return new.as_dict()