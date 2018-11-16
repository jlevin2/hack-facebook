""" Dynamically generates the advanced settings page """
from xml.etree import ElementTree as ET

html = ET.Element('html')
head = ET.Element('head')
generalStyles = ET.Element('link', attrib={'rel': 'stylesheet', 'href': 'styles.css'})
advJS = ET.Element('script', attrib={'src': 'advanced_settings.js', 'defer': ''})
head.append(generalStyles)
head.append(advJS)
html.append(head)
body = ET.Element('body')
html.append(body)
with open("../../../../categories.txt", "r") as cats:
    for cat in cats:
        cat = cat.rstrip()
        span = ET.Element('input',
                          attrib={'type': 'checkbox', 'name': cat, 'id': cat+'_id', 'value':cat})
        label = ET.Element('label', attrib={'type': 'label', 'for': cat+'_id'})
        displayText = cat.split('_')
        labelText = ''
        for word in displayText:
            labelText += word.capitalize()
            labelText += ' '
        label.text = labelText
        br = ET.Element('br')
        body.append(span)
        body.append(label)
        body.append(br)
ET.ElementTree(html).write('../advanced_settings.html', encoding='utf8',
                           method='html')

with open("../../../../categories.txt", "r") as cats:
    with open('../advanced_settings.js', 'w+') as jsFile:
        for cat in cats: # check the appropriate boxes
            cat = cat.rstrip()
            jsFile.write("""chrome.storage.sync.get(['""" + cat + """'], function(result) {
                    if (result === undefined){ 
                        document.getElementById('""" + cat + '_id' + """').checked = false;
                        console.log("not found checked """ + cat + """ to false");
                    } else if(result.""" + cat + """ === true){
                        document.getElementById('""" + cat + '_id' + """').checked = true;
                        console.log("checked """ + cat + """ to true");
                    } else { 
                        document.getElementById('""" + cat + '_id' + """').checked = false;
                        console.log("checked """ + cat + """ to false, res was: " + result.toString());
                    }
                });
                """)
with open("../../../../categories.txt", "r") as cats:
    with open('../advanced_settings.js', 'a') as jsFile:
        for cat in cats: # add listeners to see if we check or uncheck them
            cat = cat.rstrip()
            jsFile.write("""
            var checkbox_""" + cat + """ = document.getElementById('""" + cat + """_id');
                checkbox_""" + cat + """.addEventListener( 'change', function() {
                    if(this.checked) {
                        chrome.storage.sync.set({'"""+cat+"""': true}, function(){
                            console.log("set to true");
                        })
                    } else {
                        chrome.storage.sync.set({'"""+cat+"""': false}, function(){
                            console.log("set to false");
                        })
                    }
                });""")
