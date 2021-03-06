/* 
 * Masks the given domObject with all listed triggers
 */
function mask(domObj, triggers){
    console.log("Masking");
    console.log(domObj);
    var maskDiv = document.createElement("div");
    width = domObj.offsetWidth;
    height = domObj.offsetHeight;
    maskDiv.setAttribute("style", 'text-align:center;position:absolute;z-index:100;opacity:0.99;color:white;background-color:gray;width:' + width + 'px;height:' + height + 'px;margin-top:-' + height + 'px');
    var warnings = "";
    numTriggers = triggers.length;
    var i = 0;
    for (i = 0; i < numTriggers; i++){
        warnings = warnings + triggers[i];
    }
    $(maskDiv).on('click', function() {$(this).hide();});
    $(maskDiv).text('Content Warning: ' + warnings + '\nClick to remove.');
    domObj.parentNode.appendChild(maskDiv);
}

function getElementByXpath(path) {
  return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}


const POST_CONTAINER_CLASS = "_1poyrkZ7g36PawDueRza-J"; 

const POST_TITLE_CLASS = "SQnoC3ObvgnGjWt90zD9Z"; 

function fixAllPosts() {
    var containers = findAllContainers();
    var arr = Array.from(containers);
    arr.map(checkOneContainer);
}

function checkOneContainer(elem) {
    var link = getLinkFromPostElement(getTitleFromContainer(elem));
    if (link == undefined) {
        return;
    }
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
    if (triggered.length > 0){
        mask(elem, triggered);
    }
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
    var data = {link : postLink, type: 'url'};
    $.ajax({
        type: "GET",
        url: 'http://192.168.43.148:8000/content_warning',
        data: data,
        success: callback}
    );
}


/**
 * Methods to find DOM elements
 */

function getTitleFromContainer(elem) {
    return elem.getElementsByClassName(POST_TITLE_CLASS)[0];
}

function getLinkFromPostElement(elem) {
    if (elem == undefined) {
        return undefined;
    }
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
    };

    var response = DUMMY_RESPONSE;
    console.log(response);

    return response;
}

fixAllPosts();
