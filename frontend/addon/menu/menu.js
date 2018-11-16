checkbox_veteran = document.getElementById('veteran_checkbox_id');
                chrome.storage.sync.get(['veteran'], function(result) {
                    if (result === undefined){ 
                        document.getElementById('veteran_checkbox_id').checked = false;
                    } else if(result.veteran === true){
                        document.getElementById('veteran_checkbox_id').checked = true;
                    } else { 
                        document.getElementById('veteran_checkbox_id').checked = false;
                    }});

                checkbox_veteran.addEventListener( 'change', function() {
                    if(this.checked) {
                        chrome.storage.sync.set({'violence': true}, function() {
                        console.log("Stored violence as true");
                        chrome.storage.sync.set({'veteran': true}, function() { })});
                    } else {
                        chrome.storage.sync.set({'violence': false}, function() {
                        console.log("Stored violence as false");
                        chrome.storage.sync.set({'veteran': false}, function() {
                        })});
                    }
                
                    if(this.checked) {
                        chrome.storage.sync.set({'graphic_imagery': true}, function() {
                        console.log("Stored graphic_imagery as true");
                        chrome.storage.sync.set({'veteran': true}, function() { })});
                    } else {
                        chrome.storage.sync.set({'graphic_imagery': false}, function() {
                        console.log("Stored graphic_imagery as false");
                        chrome.storage.sync.set({'veteran': false}, function() {
                        })});
                    }
                });
            checkbox_survivor = document.getElementById('survivor_checkbox_id');
                chrome.storage.sync.get(['survivor'], function(result) {
                    if (result === undefined){ 
                        document.getElementById('survivor_checkbox_id').checked = false;
                    } else if(result.survivor === true){
                        document.getElementById('survivor_checkbox_id').checked = true;
                    } else { 
                        document.getElementById('survivor_checkbox_id').checked = false;
                    }});

                checkbox_survivor.addEventListener( 'change', function() {
                    if(this.checked) {
                        chrome.storage.sync.set({'sexual_violence': true}, function() {
                        console.log("Stored sexual_violence as true");
                        chrome.storage.sync.set({'survivor': true}, function() { })});
                    } else {
                        chrome.storage.sync.set({'sexual_violence': false}, function() {
                        console.log("Stored sexual_violence as false");
                        chrome.storage.sync.set({'survivor': false}, function() {
                        })});
                    }
                
                    if(this.checked) {
                        chrome.storage.sync.set({'graphic_imagery': true}, function() {
                        console.log("Stored graphic_imagery as true");
                        chrome.storage.sync.set({'survivor': true}, function() { })});
                    } else {
                        chrome.storage.sync.set({'graphic_imagery': false}, function() {
                        console.log("Stored graphic_imagery as false");
                        chrome.storage.sync.set({'survivor': false}, function() {
                        })});
                    }
                });
            