/*
 * Masks the given domObject with all listed triggers
 */

var alreadyHidden = [];

function mask(domObj, triggers){
    if (!alreadyHidden.includes(domObj)) {
        console.log("Masking content");
        var previous_style = domObj.getAttribute('style');
        domObj.setAttribute('style', '-webkit-filter: blur(9px);'  + previous_style);
        var maskDiv = document.createElement("div");
        var background = document.createElement("div");
        var width = domObj.offsetWidth;
        var height = domObj.offsetHeight;
        background.setAttribute("style", 'text-align:center;position:absolute;z-index:99;opacity:0.6;background-color:aliceblue;width:' + width + 'px;height:' + height + 'px;margin-top:-' + height + 'px');
        triggers = triggers.map((s) => s.replace('_', ' '));
        var warnings = triggers.join(', ');

        console.log(warnings);

        var warningMessage = document.createElement('div');
        warningMessage.setAttribute('style', 'text-align:center;position:absolute; z-index:100;color:blue; margin-top:-' + (height/2) + 'px;width:' + width + 'px');
        $(warningMessage).html('<p> <strong><u>Content Warning:</u> Topics you marked as inappropriate have been found in this article</strong> </p>');

        var showContent = document.createElement(('div'));
        showContent.setAttribute('style','float: right; margin-top: 20px; margin-right: 40px');
        $(showContent).html("<p>Show content</p>");

        var showTriggers = document.createElement('div');
        showTriggers.setAttribute('style','float: left; margin-top: 20px; margin-left: 40px');
        var showTriggerContent = document.createElement('p');
        $(showTriggerContent).html("Show flagged topics");

        var hideTriggerContent = document.createElement('p');
        $(hideTriggerContent).html('The following content was flagged: </br> ' + warnings + '</br>' + 'Hide Content');

        $(showTriggers).html(showTriggerContent);
        warningMessage.appendChild(showContent);
        warningMessage.appendChild(showTriggers);


        $(showContent).on('click', function() {$(maskDiv).hide(); domObj.setAttribute('style', previous_style);});
        $(showTriggerContent).on('click', function() {$(showTriggers).html(hideTriggerContent)});
        $(hideTriggerContent).on('click', function() {$(showTriggers).html(showTriggerContent)});

        maskDiv.appendChild(warningMessage);
        maskDiv.appendChild(background);
        domObj.parentNode.appendChild(maskDiv);
        alreadyHidden.push(domObj);
    }
}

const TWEET_CONTAINER_CLASS = "tweet";

const TWEET_TEXT_CLASS = "tweet-text";

function fixAllPosts() {
    var containers = findAllContainers();
    var arr = Array.from(containers);
    var not_promo = arr.filter((e) => !$(e).hasClass("promoted-tweet"));
    not_promo.filter((obj) => !alreadyHidden.includes(obj)).map(checkOneContainer);
}

function checkOneContainer(elem) {
    var link = getLinkFromTweetContainer(elem);
    var tweet = getTweetTextFromTweetContainer(elem);

    getTriggerWarning(tweet, ((r1) => getTriggerWarning(link, ((r2) => callMaskIfTriggering(elem, r1,r2)), 'url')), 'text');
}

function callMaskIfTriggering(elem,response1, response2) {
    var triggered = [];

    if (response1 != undefined) {
        for (var property in response1) {
            if (response1[property]) {
                triggered.push(property);
            }
        }
    }

    if (response2 != undefined) {
        for (var property in response2) {
            if (response2[property] && !triggered.includes(property)) {
                triggered.push(property);
            }
        }
    }

    var triggeredToMask = [];

    chrome.storage.sync.get(triggered, function(result){
        for (var trigger in triggered) {
            if (result[triggered[trigger]] == true) {
                triggeredToMask.push(triggered[trigger]);
            }
        }

        if (triggeredToMask.length > 0) {
            mask(elem, triggeredToMask);
        }
    });
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
    if (content != undefined) {
        // Response is a json with (key,value) = (category, true for triggered)
        var data = {link: content, type: typ};
        var dummy_response = {violence:true, graphic_imagery:true, animal_abuse:true, sexual_violence: true};
        $.ajax({
                type: "GET",
                url: 'http://192.168.43.148:8000/content_warning',
                data: data,
                success: callback,
                error: () => callback(dummy_response),
                timeout: 1000,
        });
    } else {
        callback(undefined)
    }
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
    if (p_class != undefined && p_class.length > 0) {
        var children = p_class[0].children;
        if (children != undefined && children.length > 0) {
            return children[0].href;
        }
    }
    return undefined;
}

function findAllContainers() {
    return document.getElementsByClassName(TWEET_CONTAINER_CLASS);
}


fixAllPosts();
window.setInterval(fixAllPosts, 1000);