function getElementByXpath(path) {
  return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

const POST_CONTAINER_CLASS = getElementByXpath(
    "//html/body/div[@id='2x-container']/div/div/div[@id='SHORTCUT_FOCUSABLE_DIV']/div/div/div/div/div[3]/div/div/div[1]/div/div/div[2]"
).className;

const POST_TITLE_CLASS = getElementByXpath(
    "//html/body/div[@id='2x-container']/div/div/div[@id='SHORTCUT_FOCUSABLE_DIV']/div/div/div/div/div[3]/div/div/div[1]/div/div/div[2]/div/div[2]/div/span/a"
).className;


function fixAllPosts() {
    var containers = findAllContainers();
    containers.map(checkOneContainer);
}

function checkOneContainer(elem) {
    var link = getLinkFromPostElement(getTitleFromContainer(elem);
    const callback = (x) => callMaskIfTriggering(elem,x);
    getTriggerWarning(link, callback);
}

function callMaskIfTriggering(elem,trigger_report) {
    var triggered = [];
    for (var property in trigger_report) {
        if trigger_report[property] {
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
        '',
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

