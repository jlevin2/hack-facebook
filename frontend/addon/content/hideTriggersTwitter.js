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

const TWEET_CONTAINER_CLASS = "tweet";

const TWEET_TEXT_CLASS = "tweet-text";

const TWEET_OUTBOUND_LINK = "js-openLink";

function fixAllPosts() {
    var containers = findAllContainers();
    var arr = Array.from(containers);
    arr.map(checkOneContainer);
}

function checkOneContainer(elem) {
    var link = getLinkFromTweetContainer(elem);
    var tweet = getTweetTextFromTweetContainer(elem);
    /*if (link == undefined) {
        return;
    }*/
    const callback = (x) => callMaskIfTriggering(elem,x);
    //getTriggerWarning(link, callback, 'url');
    getTriggerWarning(tweet, callback, 'text');
}

function callMaskIfTriggering(elem,triggered) {
    triggers = triggered.length;
    if (triggers > 0) {
        triggeredToMask = [];
        for (i = 0; i < triggers; i++){
            chrome.storage.sync.get([triggers[i]], function(result){
                if (result !== undefined){
                    triggeredToMask.push(triggers[i]);
                }
            });
        }
        if (triggeredToMask.length > 0) {
            mask(elem, triggeredToMask);
        }
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
function getTriggerWarning(content, callback, typ) {
    // Response is a json with (key,value) = (category, true for triggered)
    var data = {link : content, type: typ};
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

function getTweetTextFromTweetContainer(elem) {
    var p_class = elem.getElementsByClassName(TWEET_TEXT_CLASS);
    if (p_class != undefined && p_class.length > 0) {
        return p_class[0].textContent;
    }
    return undefined;
}

function getLinkFromTweetContainer(elem) {
    var p_class = elem.getElementsByClassName(TWEET_TEXT_CLASS);
    if (p_class != undefined) {
        var children = p_class.getElementsByTagName('a');
        if (children.length > 0) {
            return children[0].href;
        }
    }
    return undefined;
}

function findAllContainers() {
    return document.getElementsByClassName(TWEET_CONTAINER_CLASS);
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
