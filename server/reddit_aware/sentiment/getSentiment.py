from google.cloud.language import enums
from google.cloud.language import types
import json
import requests

API_KEY = "AIzaSyC0sWDhT_vZqjWkBiPjb6vQT2wvtYbkAYo"
URL = "https://language.googleapis.com/v1/documents:analyzeSentiment?fields=documentSentiment%2Csentences&key="

"""
getTextSentiment takes in PLAIN TEXT to run sentiment analysis on
returns a dictionary, with the following fields:
score - overall emotion of a document
magnitude - amount of emotional content in the text
"""


def getTextSentiment(text):
    end_point = URL + API_KEY
    params = {'document': {'content': text,
                           'type': enums.Document.Type.PLAIN_TEXT},
              'encodingType': enums.EncodingType.UTF8}
    r = requests.post(url=end_point, json=params)
    response = json.loads(r.text)
    document_sentiment = response['documentSentiment']

    # sentence_sentiment = response['sentences']

    return document_sentiment


"""
getHTMLSentiment takes in HTML to run sentiment analysis on
returns a string representation of a json, with the following fields:
score - overall emotion of a document
magnitude - amount of emotional content in the text
"""


def getHTMLSentiment(html):
    end_point = URL + API_KEY
    params = {'document': {'content': html,
                           'type': enums.Document.Type.HTML},
              'encodingType': enums.EncodingType.UTF8}
    r = requests.post(url=end_point, json=params)
    response = json.loads(r.text)
    document_sentiment = response['documentSentiment']
    sentence_sentiment = response['sentences']
    print(document_sentiment)
    print(sentence_sentiment)
    return response


"""
getURLSentiment takes in a url and runs sentiment analysis on the HTML content of the page
"""


def getURLSentiment(url):
    content = requests.get(url=url)

    return getHTMLSentiment(content.text)