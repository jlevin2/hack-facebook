# Imports the Google Cloud client library
from google.cloud import language
from google.cloud.language import enums
from google.cloud.language import types
import json
import requests

API_KEY = "AIzaSyC0sWDhT_vZqjWkBiPjb6vQT2wvtYbkAYo"

CLIENT = language.LanguageServiceClient()


"""
getTextSentiment takes in PLAIN TEXT to run sentiment analysis on
returns a string representation of a json, with the following fields:
score - overall emotion of a document
magnitude - amount of emotional content in the text
"""


def getTextSentiment(text):
    document = language.types.Document(
        content=text,
        type='PLAIN_TEXT',
    )

    response = CLIENT.analyze_sentiment(document=document, encoding_type='UTF32')

    sentiment = response.document_sentiment


    toConvert = {"score": sentiment.score, "magnitude":sentiment.magnitude}

    return json.dumps(toConvert)

"""
getTextSentiment takes in HTML to run sentiment analysis on
returns a string representation of a json, with the following fields:
score - overall emotion of a document
magnitude - amount of emotional content in the text
"""


def getHTMLSentiment(html):
    document = language.types.Document(
        content=html,
        type='HTML',
    )

    response = CLIENT.analyze_sentiment(document=document, encoding_type='UTF32')

    sentiment = response.document_sentiment

    toConvert = {"score": sentiment.score, "magnitude": sentiment.magnitude}

    return json.dumps(toConvert)

def getURLSentiment(url):
    content = requests.get(url=url)

    return getHTMLSentiment(content.text)
