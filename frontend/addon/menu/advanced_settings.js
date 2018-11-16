chrome.storage.sync.get(['sexual_violence'], function(result) {
                    if (result === undefined){ 
                        document.getElementById('sexual_violence_id').checked = false;
                        console.log("checked sexual_violence to false");
                    } else if(result === true){
                        document.getElementById('sexual_violence_id').checked = true;
                        console.log("checked sexual_violence to true");
                    } else { 
                        document.getElementById('sexual_violence_id').checked = false;
                        console.log("checked sexual_violence to false");
                    }
                });
                chrome.storage.sync.get(['violence'], function(result) {
                    if (result === undefined){ 
                        document.getElementById('violence_id').checked = false;
                        console.log("checked violence to false");
                    } else if(result === true){
                        document.getElementById('violence_id').checked = true;
                        console.log("checked violence to true");
                    } else { 
                        document.getElementById('violence_id').checked = false;
                        console.log("checked violence to false");
                    }
                });
                chrome.storage.sync.get(['animal_abuse'], function(result) {
                    if (result === undefined){ 
                        document.getElementById('animal_abuse_id').checked = false;
                        console.log("checked animal_abuse to false");
                    } else if(result === true){
                        document.getElementById('animal_abuse_id').checked = true;
                        console.log("checked animal_abuse to true");
                    } else { 
                        document.getElementById('animal_abuse_id').checked = false;
                        console.log("checked animal_abuse to false");
                    }
                });
                chrome.storage.sync.get(['graphic_imagery'], function(result) {
                    if (result === undefined){ 
                        document.getElementById('graphic_imagery_id').checked = false;
                        console.log("checked graphic_imagery to false");
                    } else if(result === true){
                        document.getElementById('graphic_imagery_id').checked = true;
                        console.log("checked graphic_imagery to true");
                    } else { 
                        document.getElementById('graphic_imagery_id').checked = false;
                        console.log("checked graphic_imagery to false");
                    }
                });
                