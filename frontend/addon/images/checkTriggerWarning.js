const POST_CONTAINER_CLASS = "_1poyrkZ7g36PawDueRza-J";
const POST_TITLE_CLASS = "SQnoC3ObvgnGjWt90zD9Z";


function findAllPostLinks() {
    var containers = findAllContainers();
    var postTitles = containers.map(getTitleFromContainer);
    return postTitles.map(getLinkFromPostElement);
}

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
 */
function getSentimentAnalysis(postLink) {

}


/**
 * given a postLink, gets the trigger warnings associated with the content
 * in the link
 * @param postLink - url to the post to scan
 */
function getTriggerWarning(postLink) {

}