{
    "translatorID": "YOUR-NEW-TRANSLATOR-ID",
    "label": "CSV Import",
    "creator": "Your Name",
    "target": "csv",
    "minVersion": "4.0.26",
    "maxVersion": "",
    "priority": 100,
    "displayOptions": {
        "importCharset": "UTF-8"
    },
    "inRepository": true,
    "translatorType": 2,
    "lastUpdated": "2024-08-14"
}

/*
    ***** BEGIN LICENSE BLOCK *****
    ...
    ***** END LICENSE BLOCK *****
*/

function detectImport() {
    var sample = Zotero.readable();
    if (sample.startsWith("key")) { // Your condition to identify the correct CSV structure
        return true;
    }
    return false;
}

function doImport() {
    var csvData = Zotero.readable(); // Read the CSV data
    var rows = csvData.split("\n");
    var headers = rows[0].split(",").map(h => h.trim());

    for (let i = 1; i < rows.length; i++) {
        let row = rows[i].split(",").map(r => r.trim());
        if (row.length !== headers.length) continue; // Skip malformed rows

        var item = new Zotero.Item("book"); // Change this to the appropriate item type
        for (let j = 0; j < headers.length; j++) {
            let field = headers[j];
            let value = row[j];

            switch (field) {
                case "title":
                    item.title = value;
                    break;
                case "author":
                    item.creators.push(Zoter.Creator({
                        lastName: value
                    }));
                    break;
                case "publicationYear":
                    item.date = value;
                    break;
                // Add more fields as needed
                default:
                    item[field] = value; // For general fields
            }
        }
        item.complete();
    }
}
