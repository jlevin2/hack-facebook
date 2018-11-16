from django.shortcuts import render
from django.http import HttpResponse
import json
from .models import CWDocument

from .ml import runModel
# Create your views here.

def response(inp):
    url = inp.GET.get('url')
    cw = inp.GET.get('cw')
    return HttpResponse(json.dumps(handleRequest(url, cw)))


def handleRequest(url, cw):
    contents = CWDocument.objects.filter(page_id=url)
    if len(contents) == 0:
        return flag(contents, getDoc(url))
    else:
        return flag(contents, cw)



def getDoc(url):


    new = CWDocument.objects.create(page_id=url, score=sentiment['score'], emotion=sentiment['magnitude'])
    new.save()
    return new.as_dict()

def flag(contents, cw):
    return False

#
# def response(request):
#     page = request.GET.get('page')
#     inDB = checkDB(page)
#     return HttpResponse(str(inDB))
#     # d = Document.objects.create(page_id='test_page', trigger_content='sex', probability=1.00)
#     # d.save()
#     # return HttpResponse("PUT THE OBJECT IN!")
#
#
# def checkDB(page):
#     contents = CWDocument.objects.filter(page_id=page)
#     if len(contents) == 0:
#         return 0
#         # run model
#     else:
#         return 1