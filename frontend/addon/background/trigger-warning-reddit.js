chrome.runtime.onInstalled.addListener(function() {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [
                new chrome.declarativeContent.PageStateMatcher({
                    pageUrl: {urlContains: 'reddit.com'},
                })
            ],
            actions: [ new chrome.declarativeContent.ShowPageAction() ]
        }]);
    });
});


/*chrome.runtime.onInstalled.addListener(function() {

});

function mask(domObj) {
    
}*/
