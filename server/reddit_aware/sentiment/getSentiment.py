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
returns a dictionary, with the following fields:
score - overall emotion of a document
magnitude - amount of emotional content in the text
"""


def getTextSentiment(text):
    document = language.types.Document(
        content=text,
        type=enums.Document.Type.PLAIN_TEXT,
    )

    response = CLIENT.analyze_sentiment(document=document, encoding_type='UTF32')

    sentiment = response.document_sentiment

    to_return = {"score": sentiment.score, "magnitude":sentiment.magnitude}

    return to_return


"""
getHTMLSentiment takes in HTML to run sentiment analysis on
returns a string representation of a json, with the following fields:
score - overall emotion of a document
magnitude - amount of emotional content in the text
"""


def getHTMLSentiment(html):
    document = language.types.Document(
        content=html,
        type=enums.Document.Type.HTML,
    )

    response = CLIENT.analyze_sentiment(document=document, encoding_type='UTF32')

    sentiment = response.document_sentiment

    to_return = {"score": sentiment.score, "magnitude": sentiment.magnitude}

    return to_return


"""
getURLSentiment takes in a url and runs sentiment analysis on the HTML content of the page
"""


def getURLSentiment(url):
    content = requests.get(url=url)

    return getHTMLSentiment(content.text)
