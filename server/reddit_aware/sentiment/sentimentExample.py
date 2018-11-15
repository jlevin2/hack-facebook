# Imports the Google Cloud client library
import getSentiment as sentiment
import json

result1 = sentiment.getTextSentiment('I feel amazing!')

print(result1)

output = json.loads(result1)

print(output['magnitude'])
print(output['score'])

urlSentiment = sentiment.getURLSentiment('https://medium.com/@steve.yegge/why-i-left-google-to-join-grab-86dfffc0be84')

print(urlSentiment)

output1 = json.loads(urlSentiment)

print(output1['magnitude'])
print(output1['score'])