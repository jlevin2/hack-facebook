with open("../menu.js", "w+") as out:
    with open("../../../../userToCategories.txt", 'r') as fil:
        for line in fil:
            user, catStr = line.split(':')
            catLst = catStr.split(',')
            out.write("""checkbox = document.getElementById('""" + user + """_checkbox_id');
                checkbox.addEventListener( 'change', function() {""")
            for cat in catLst: # add listeners to if we check or uncheck them
                cat = cat.rstrip()
                out.write("""
                    if(this.checked) {
                        chrome.storage.sync.set({'"""+cat+"""': true}, function() {
                        console.log("Stored """ + cat + """ as true");
                        })
                    } else {
                        chrome.storage.sync.set({'"""+cat+"""': false}, function() {
                        console.log("Stored """ + cat + """ as false");
                        })
                    }
                """) 
            out.write("""});""")
