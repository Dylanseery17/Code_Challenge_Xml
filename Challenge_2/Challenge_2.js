const fs = require('fs');
// Node js libary allowing to convert to XMLHttpRequest
const DOMParser = require('xmldom').DOMParser;
// Taking the following XML document, write code to extract the RefText values for the following 
// RefCodes:   ‘MWB’, ‘TRV’ and ‘CAR'
const ref_codes = [ "MWB", "TRV", "CAR"];
// File read in and setup
const data = fs.readFileSync('data.xml', 'utf8');
const doc = new DOMParser().parseFromString(data.toString());

// Getting Reference elements
const reference = doc.getElementsByTagName("Reference");
// Looping Reference elements
for(i in reference){
    try {
        // Getting ReferenceCode from Reference elements
        const ref_code = reference[i].attributes.getNamedItem("RefCode").value;
        // if its valid in our inital ref_codes array ... ‘MWB’, ‘TRV’ and ‘CAR'
        if(ref_codes.includes(ref_code)){
            // Get Reference text if valid and print it
            const refText = doc.getElementsByTagName("RefText")[i].childNodes[0].nodeValue;
            console.log(refText);
        }
    } catch (error) {
        continue;
    }
}