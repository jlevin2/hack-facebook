import requests



def runModel(cont, typ):
    if typ.lower() == 'text':
        return classifyText(cont)
    else:
        return classifyUrl(cont)

def classifyText(text):
    return [False, False, True, True]


def classifyUrl(url):
    g = requests.get(url)
    return classifyText(g.text)




