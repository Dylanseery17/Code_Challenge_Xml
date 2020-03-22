var hprose = require("hprose");
// Node js libary allowing to convert to XMLHttpRequest
const DOMParser = require('xmldom').DOMParser;

function xmlParse(xml_data){
    let val, doc, declaration, command, site_id;
    let errors = [];
    doc  = new DOMParser({
        errorHandler: {
           warning: (msg) => {errors.push(msg)},
           error: (msg) => {errors.push(msg)},
           fatalError: (msg) =>  {errors.push(msg)},
        },
    }).parseFromString(xml_data);

    if(errors.length == 0) val = 0;
    else return errors;

    declaration  = doc.getElementsByTagName("Declaration");
    command  = declaration[declaration.length-1].attributes.getNamedItem("Command").value;
    site_id  = doc.getElementsByTagName("SiteID")[0].childNodes[0].nodeValue;
    
    if(command == "DEFAULT") val = -1;
    if(site_id == "DUB") val = -2;
    
    if(val == 0) return [val + ' - correct structure.']; 
    else if(val == -1) return [val + ' - invalid command specified.'];
    else if(val == -2) return [val + ' - invalid Site specified.'];
}


var server = hprose.Server.create("http://127.0.0.1:8080");
server.addFunction(xmlParse);
server.start();
console.log("Server started...");