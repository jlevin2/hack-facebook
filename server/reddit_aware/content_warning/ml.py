import requests



def runModel(cont, typ):
    if typ.lower() == 'text':
        return classifyText(cont)
    else:
        return classifyUrl(cont)

def classifyText(text):
    categories = open('/Users/JoshLevin/Desktop/hack@facebook/hack-facebook/keywords.txt', 'r')
    keywords = categories.readlines()
    res = [False, False, False, False]
    for i,c in enumerate(keywords):
        for w in c.split(','):

            if w in text:
                res[i] = True
    #
    # for w in banned:
    #     if w in text:
    #         return [True, True, True, True]

    return res
   # return [False, False, True, True]


def classifyUrl(url):
    g = requests.get(url)
    #print(g.text)
    return classifyText(g.text)




