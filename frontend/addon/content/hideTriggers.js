/* 
 * Masks the given domObject with all listed triggers
 */
function mask(domObj, triggers){
    var maskDiv = document.createElement("div");
    maskDiv.setAttribute("style", '"opacity:0.8;background-color:black;"');
    var warnings = "";
    numTriggers = triggers.length();
    var i = 0;
    for (i = 0; i < numTriggers; i++){
        warnings = warnings + triggers[i];
    }
    maskDiv.text = 'Trigger Warning: ' + warnings;
}

function getElementByXpath(path) {
  return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}



var POST_CONTAINER_CLASS = "";
    
if (getElementByXpath("//html/body/div[@id='2x-container']/div/div/div[@id='SHORTCUT_FOCUSABLE_DIV']/div/div/div/div/div[3]/div/div/div[1]/div/div/div[2]") != undefined) { 
    POST_CONTAINER_CLASS = getElementByXpath("//html/body/div[@id='2x-container']/div/div/div[@id='SHORTCUT_FOCUSABLE_DIV']/div/div/div/div/div[3]/div/div/div[1]/div/div/div[2]").className; 
} else { 
    POST_CONTAINER_CLASS = "_1poyrkZ7g36PawDueRza-J"; 
}

var POST_TITLE_CLASS = "";

if (getElementByXpath("//html/body/div[@id='2x-container']/div/div/div[@id='SHORTCUT_FOCUSABLE_DIV']/div/div/div/div/div[3]/div/div/div[1]/div/div/div[2]/div/div[2]/div/span/a") != undefined) { 
    POST_TITLE_CLASS = getElementByXpath("//html/body/div[@id='2x-container']/div/div/div[@id='SHORTCUT_FOCUSABLE_DIV']/div/div/div/div/div[3]/div/div/div[1]/div/div/div[2]/div/div[2]/div/span/a").className; 
} else { 
    POST_TITLE_CLASS = "SQnoC3ObvgnGjWt90zD9Z"; 
}


function fixAllPosts() {
    var containers = findAllContainers();
    var arr = Array.prototype.slice.call( containers );
    arr.map(checkOneContainer);
}

function checkOneContainer(elem) {
    var link = getLinkFromPostElement(getTitleFromContainer(elem));
    const callback = (x) => callMaskIfTriggering(elem,x);
    getTriggerWarning(link, callback);
}

function callMaskIfTriggering(elem,trigger_report) {
    var triggered = [];
    for (var property in trigger_report) {
        if (trigger_report[property]) {
            triggered.push(property);
        }
    }

    mask(elem, triggered);
}


/**
 * given a postLink, gets the trigger warnings associated with the content
 * in the link
 * @param postLink - url to the post to scan
 *
 * @return Object - a json where the keys are categories, and values is true
 * if the triggering category is present
 */
function getTriggerWarning(postLink, callback) {
    // Response is a json with (key,value) = (category, true for triggered)
    var data = {link : postLink};
    $.ajax(
        'http://172.22.171.7:8000/content_warning',
        data,
        callback
    );
}


/**
 * Methods to find DOM elements
 */

function getTitleFromContainer(elem) {
    return elem.getElementsByClassName(POST_TITLE_CLASS);
}

function getLinkFromPostElement(elem) {
    return elem.href;
}

function findAllContainers() {
    return document.getElementsByClassName(POST_CONTAINER_CLASS);
}

/**
 * given a postLink, gets the sentiment analysis of the content in the link
 * @param postLink - url to the post to scan
 *
 * @returns Object - a json with two (key,value) where the keys are score
 * and magnitude
 */
function getSentimentAnalysis(postLink) {
    var DUMMY_RESPONSE = {
        'score' : 1.1,
        'magnitude' : 15
    }

    var response = DUMMY_RESPONSE;
    console.log(response);

    return response;
}

fixAllPosts();
