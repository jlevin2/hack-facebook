chrome.storage.sync.get(['sexual_violence'], function(result) {
                    if (result === undefined){ 
                        document.getElementById('sexual_violence_id').checked = false;
                        console.log("not found checked sexual_violence to false");
                    } else if(result.sexual_violence === true){
                        document.getElementById('sexual_violence_id').checked = true;
                        console.log("checked sexual_violence to true");
                    } else { 
                        document.getElementById('sexual_violence_id').checked = false;
                        console.log("checked sexual_violence to false, res was: " + result.toString());
                    }
                });
                chrome.storage.sync.get(['violence'], function(result) {
                    if (result === undefined){ 
                        document.getElementById('violence_id').checked = false;
                        console.log("not found checked violence to false");
                    } else if(result.violence === true){
                        document.getElementById('violence_id').checked = true;
                        console.log("checked violence to true");
                    } else { 
                        document.getElementById('violence_id').checked = false;
                        console.log("checked violence to false, res was: " + result.toString());
                    }
                });
                chrome.storage.sync.get(['animal_abuse'], function(result) {
                    if (result === undefined){ 
                        document.getElementById('animal_abuse_id').checked = false;
                        console.log("not found checked animal_abuse to false");
                    } else if(result.animal_abuse === true){
                        document.getElementById('animal_abuse_id').checked = true;
                        console.log("checked animal_abuse to true");
                    } else { 
                        document.getElementById('animal_abuse_id').checked = false;
                        console.log("checked animal_abuse to false, res was: " + result.toString());
                    }
                });
                chrome.storage.sync.get(['graphic_imagery'], function(result) {
                    if (result === undefined){ 
                        document.getElementById('graphic_imagery_id').checked = false;
                        console.log("not found checked graphic_imagery to false");
                    } else if(result.graphic_imagery === true){
                        document.getElementById('graphic_imagery_id').checked = true;
                        console.log("checked graphic_imagery to true");
                    } else { 
                        document.getElementById('graphic_imagery_id').checked = false;
                        console.log("checked graphic_imagery to false, res was: " + result.toString());
                    }
                });
                
            var checkbox_sexual_violence = document.getElementById('sexual_violence_id');
                checkbox_sexual_violence.addEventListener( 'change', function() {
                    if(this.checked) {
                        chrome.storage.sync.set({'sexual_violence': true}, function(){
                            console.log("set to true");
                        })
                    } else {
                        chrome.storage.sync.set({'sexual_violence': false}, function(){
                            console.log("set to false");
                        })
                    }
                });
            var checkbox_violence = document.getElementById('violence_id');
                checkbox_violence.addEventListener( 'change', function() {
                    if(this.checked) {
                        chrome.storage.sync.set({'violence': true}, function(){
                            console.log("set to true");
                        })
                    } else {
                        chrome.storage.sync.set({'violence': false}, function(){
                            console.log("set to false");
                        })
                    }
                });
            var checkbox_animal_abuse = document.getElementById('animal_abuse_id');
                checkbox_animal_abuse.addEventListener( 'change', function() {
                    if(this.checked) {
                        chrome.storage.sync.set({'animal_abuse': true}, function(){
                            console.log("set to true");
                        })
                    } else {
                        chrome.storage.sync.set({'animal_abuse': false}, function(){
                            console.log("set to false");
                        })
                    }
                });
            var checkbox_graphic_imagery = document.getElementById('graphic_imagery_id');
                checkbox_graphic_imagery.addEventListener( 'change', function() {
                    if(this.checked) {
                        chrome.storage.sync.set({'graphic_imagery': true}, function(){
                            console.log("set to true");
                        })
                    } else {
                        chrome.storage.sync.set({'graphic_imagery': false}, function(){
                            console.log("set to false");
                        })
                    }
                });