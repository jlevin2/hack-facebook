import requests

# Word2Vec Model
from gensim.models import Word2Vec
# NLTK
import nltk
#
# # Download Project Gutenberg Corpus
# nltk.download("gutenberg")
#
model = Word2Vec.load('/Users/JoshLevin/Desktop/hack@facebook/hack-facebook/server/reddit_aware/brown.embedding')

THRESHOLD = 0.8

def runModel(cont, typ):
    if typ.lower() == 'text':
        return classifyText(cont)
    else:
        return classifyUrl(cont)

def classifyText(text):
    categories = open('/Users/JoshLevin/Desktop/hack@facebook/hack-facebook/keywords.txt', 'r')
    keywords = categories.readlines()
    res = [False, False, False, False]
    comp = 0
    for i,c in enumerate(keywords):
        score = 0.0
        for w in c.split(','):
            for word in text:
                try:
                    score += model.wv.similarity(w,word)
                    comp += 1
                except:
                    pass
        # print(score)
        # print(keywords)
        # print(text)
        # print(score/comp)
        if score/comp > THRESHOLD:
            res[i] = True

    #
    # for w in banned:
    #     if w in text:
    #         return [True, True, True, True]

    return res
   # return [False, False, True, True]

# def classifyText(text):
#     categories = open('/Users/JoshLevin/Desktop/hack@facebook/hack-facebook/keywords.txt', 'r')
#     keywords = categories.readlines()
#     res = [False, False, False, False]
#     for i,c in enumerate(keywords):
#         for w in c.split(','):
#             if w in text:
#                 res[i] = True
#     # if True in res:
#     #     print(text)
#     return res


def classifyUrl(url):
    g = requests.get(url)
    return classifyText(g.text)




