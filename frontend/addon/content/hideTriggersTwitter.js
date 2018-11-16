/*
 * Masks the given domObject with all listed triggers
 */

var alreadyHidden = [];

function mask(domObj, triggers){
        console.log('Masking');
        var previous_style = domObj.getAttribute('style');
        domObj.setAttribute('style', '-webkit-filter: blur(9px);'  + previous_style);
        var maskDiv = document.createElement("div");
        var background = document.createElement("div");
        var width = domObj.offsetWidth;
        var height = domObj.offsetHeight;
        background.setAttribute("style", 'text-align:center;position:absolute;z-index:99;opacity:0.6;background-color:aliceblue;width:' + width + 'px;height:' + height + 'px;margin-top:-' + height + 'px');
        triggers = triggers.map((s) => s.replace('_', ' '));
        var warnings = triggers.join(', ');


        var warningMessage = document.createElement('div');
        warningMessage.setAttribute('style', 'font-family: "Verdana", sans-serif;text-align:center;position:absolute; z-index:100;color:blue; margin-top:-' + (height * 0.7) + 'px;width:' + width + 'px');
        $(warningMessage).html('<p> <strong><u>Content Warning:</u> Topics you marked as inappropriate have been found in this article</strong> </p>');

        var showContent = document.createElement(('div'));
        showContent.setAttribute('style','font-family: "Verdana", sans-serif;text-align: center; float: right; margin-top: 20px; width:' + (width/2) + 'px');
        $(showContent).html("<p>Show content</p>");

        var showTriggers = document.createElement('div');
        showTriggers.setAttribute('style','font-family: "Verdana", sans-serif;text-align: center; float: left; margin-top: 20px; width:' + (width/2) + 'px');
        var showTriggerContent = document.createElement('p');
        $(showTriggerContent).html("Show flagged topics");

        var hideTriggerContent = document.createElement('p');
        $(hideTriggerContent).html('The following content was flagged: </br> ' + warnings + '</br> </br>' + 'Hide Content');

        $(showTriggers).html(showTriggerContent);
        warningMessage.appendChild(showContent);
        warningMessage.appendChild(showTriggers);


        $(showContent).on('click', function() {$(maskDiv).hide(); domObj.setAttribute('style', previous_style);});
        $(showTriggerContent).on('click', function() {$(this).detach(); showTriggers.appendChild(hideTriggerContent);});
        $(hideTriggerContent).on('click', function() {$(this).detach(); showTriggers.appendChild(showTriggerContent);});

        maskDiv.appendChild(warningMessage);
        maskDiv.appendChild(background);
        domObj.parentNode.appendChild(maskDiv);
}

const TWEET_CONTAINER_CLASS = "tweet";

const TWEET_TEXT_CLASS = "tweet-text";

function fixAllPosts() {
    var containers = findAllContainers();
    var arr = Array.from(containers);
    var not_promo = arr.filter((e) => !$(e).hasClass("promoted-tweet"));
    var not_checked = not_promo.filter((obj) => !alreadyHidden.includes(obj))
    if (not_checked.length > 0 ){
        console.log('fixing all new posts');
        not_checked.map(checkOneContainer);
    } else {
        console.log('all posts already fixed');
    }
}

function checkOneContainer(elem) {
    alreadyHidden.push(elem);
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
        $.ajax({
                type: "GET",
                url: 'http://192.168.43.148:8000/content_warning',
                data: data,
                success: callback,
                // error: () => callback(dummy_response),
                // timeout: 1000,
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