checkbox = document.getElementById('veteran_checkbox_id');
                checkbox.addEventListener( 'change', function() {
                    if(this.checked) {
                        chrome.storage.sync.set({'violence': true}, function() {
                        console.log("Stored violence as true");
                        })
                    } else {
                        chrome.storage.sync.set({'violence': false}, function() {
                        console.log("Stored violence as false");
                        })
                    }
                
                    if(this.checked) {
                        chrome.storage.sync.set({'graphic_imagery': true}, function() {
                        console.log("Stored graphic_imagery as true");
                        })
                    } else {
                        chrome.storage.sync.set({'graphic_imagery': false}, function() {
                        console.log("Stored graphic_imagery as false");
                        })
                    }
                });checkbox = document.getElementById('survivor_checkbox_id');
                checkbox.addEventListener( 'change', function() {
                    if(this.checked) {
                        chrome.storage.sync.set({'sexual_violence': true}, function() {
                        console.log("Stored sexual_violence as true");
                        })
                    } else {
                        chrome.storage.sync.set({'sexual_violence': false}, function() {
                        console.log("Stored sexual_violence as false");
                        })
                    }
                
                    if(this.checked) {
                        chrome.storage.sync.set({'graphic_imagery': true}, function() {
                        console.log("Stored graphic_imagery as true");
                        })
                    } else {
                        chrome.storage.sync.set({'graphic_imagery': false}, function() {
                        console.log("Stored graphic_imagery as false");
                        })
                    }
                });