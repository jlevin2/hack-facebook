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

const POST_CONTAINER_CLASS = "tweet";

var POST_TITLE_CLASS = "tweet-text";

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
    var data = {link : postLink, type: 'url'};
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
    };

    var response = DUMMY_RESPONSE;
    console.log(response);

    return response;
}

fixAllPosts();
