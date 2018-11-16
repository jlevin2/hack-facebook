from django.shortcuts import render
from django.http import HttpResponse
import json
from .models import CWDocument

from .ml import runModel
# Create your views here.

#THRESHOLD = 0.5

def response(inp):
    url = inp.GET.get('url')
    cw = inp.GET.get('cw')
    dct = handleRequest(url, cw)
    dct['url'] = url
    return HttpResponse(json.dumps(dct))


def handleRequest(url, cw):
    contents = CWDocument.objects.filter(page_id=url)
    if len(contents) == 0:
        return flag(getDoc(url), cw)
    else:
        return flag(contents, cw)



def getDoc(url):
    categories = open('/Users/JoshLevin/Desktop/hack@facebook/hack-facebook/categories.txt', 'r')
    cat = categories.read().splitlines()
    newObj = []

    safe = runModel(url)
    for i,c in enumerate(cat):
        newObj.append(CWDocument.objects.create(page_id=url, trigger_content=c, unsafe=safe[i]))
        newObj[i].save()

    return newObj

def flag(contents, cw):
    resp = {}

    for elem in contents:
        if elem.trigger_content in cw:
            resp[elem.trigger_content] = elem.unsafe


    return resp

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