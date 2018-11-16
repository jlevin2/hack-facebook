from django.shortcuts import render
from django.http import JsonResponse
import json
from .models import CWDocument
import hashlib

from .ml import runModel
# Create your views here.


def response(inp):
    #url = inp.GET.get('url')
    #cw = inp.GET.get('cw')
    cont = inp.GET['link']
    typ = inp.GET['type']
    dct = handleRequest(cont, typ)
    return JsonResponse(dct)


def handleRequest(url, typ):
    contents = CWDocument.objects.filter(page_id=url)
    if len(contents) == 0:
        return flag(getDoc(url, typ))
    else:
        return flag(contents)

def getDoc(cont, typ):
    categories = open('/Users/JoshLevin/Desktop/hack@facebook/hack-facebook/categories.txt', 'r')
    cat = categories.read().splitlines()
    newObj = []

    safe = runModel(cont, typ)
    for i,c in enumerate(cat):
        m = hashlib.sha256(str.encode(cont))
        newObj.append(CWDocument.objects.create(page_id=m.hexdigest(), trigger_content=c, unsafe=safe[i]))
        newObj[i].save()

    return newObj

def flag(contents):
    resp = {}

    for elem in contents:
        resp[elem.trigger_content] = elem.unsafe


    return resp
