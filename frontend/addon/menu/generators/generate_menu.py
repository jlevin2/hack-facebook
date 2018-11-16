with open("../menu.js", "w+") as out:
    with open("../../../../userToCategories.txt", 'r') as fil:
        for line in fil:
            user, catStr = line.split(':')
            catLst = catStr.split(',')
            out.write("""checkbox_""" + user + """ = document.getElementById('""" + user + """_checkbox_id');
                chrome.storage.sync.get(['""" + user + """'], function(result) {
                    if (result === undefined){ 
                        document.getElementById('""" + user + """_checkbox_id').checked = false;
                    } else if(result.""" + user + """ === true){
                        document.getElementById('""" + user + """_checkbox_id').checked = true;
                    } else { 
                        document.getElementById('""" + user + """_checkbox_id').checked = false;
                    }});

                checkbox_""" + user + """.addEventListener( 'change', function() {""")
            for cat in catLst: # add listeners to if we check or uncheck them
                cat = cat.rstrip()
                out.write("""
                    if(this.checked) {
                        chrome.storage.sync.set({'"""+cat+"""': true}, function() {
                        console.log("Stored """ + cat + """ as true");
                        chrome.storage.sync.set({'"""+user+"""': true}, function() { })});
                    } else {
                        chrome.storage.sync.set({'"""+cat+"""': false}, function() {
                        console.log("Stored """ + cat + """ as false");
                        chrome.storage.sync.set({'"""+user+"""': false}, function() {
                        })});
                    }
                """) 
            out.write("""});
            """)
