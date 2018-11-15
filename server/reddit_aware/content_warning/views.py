from django.shortcuts import render
from django.http import HttpResponse

from .models import Document
# Create your views here.

def response(request):
    page = request.GET.get('page')
    inDB = checkDB(page)
    return HttpResponse(str(inDB))
    # d = Document.objects.create(page_id='test_page', trigger_content='sex', probability=1.00)
    # d.save()
    # return HttpResponse("PUT THE OBJECT IN!")


def checkDB(page):
    contents = Document.objects.filter(page_id=page)
    if len(contents) == 0:
        return 0
        # run model
    else:
        return 1