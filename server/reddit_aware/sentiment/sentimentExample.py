# Imports the Google Cloud client library
import getSentimentHTTP as Sentiment
import json


text = 'I feel amazing! I feel like I can fly! I just got an offer!'
print('---------- input: positive plain text ---------')
result1 = Sentiment.getTextSentiment(text)


print('---------- input: medium article html ---------')


urlSentiment = Sentiment.getURLSentiment('https://medium.com/@steve.yegge/why-i-left-google-to-join-grab-86dfffc0be84')

print(urlSentiment)

print('---------- input: medium article text ---------')

mediumText = """
I’ve seen Grab’s hunger. I’ve felt it. I have it. This space is win or die. They will fight to the death, and I am with them. This company, with some 3000 employees I think, is more unified than I’ve seen with most 5-person companies. This is the kind of focused camaraderie, cooperation and discipline that you typically only see in the military, in times of war.
"""

mediumSentiment = Sentiment.getTextSentiment(mediumText)

print(mediumSentiment)
