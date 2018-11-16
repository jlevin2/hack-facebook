# Word2Vec Model
from gensim.models import Word2Vec
import gensim
from gensim.models import KeyedVectors
# NLTK
import nltk

# Download Project Gutenberg Corpus


# #sentences = nltk.corpus.gutenberg.sents("bible-kjv.txt")
# sentences = nltk.corpus.brown.sents() + nltk.corpus.cmudict.sents()
#
#
# model = Word2Vec(sentences, size=150, min_count=2, window=5, workers=4, sg=1)
#
# test = ["happy", "blood", "pleasant"]
# r = [ "assault", "consent", "victim"]
#
# for e in r:
#     print(model.wv.similarity("rape",e))
#
#
# model.save('cmudict-brown.embedding')

model = KeyedVectors.load_word2vec_format('/Users/JoshLevin/Desktop/hack@facebook/hack-facebook/server/reddit_aware/google-embedding.bin', binary=True)
model.save_word2vec_format('google.txt', binary=False)

model = Word2Vec.load('/Users/JoshLevin/Desktop/hack@facebook/hack-facebook/server/reddit_aware/google.txt')

THRESHOLD = 0.75

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


print(classifyText("Help I am sad"))