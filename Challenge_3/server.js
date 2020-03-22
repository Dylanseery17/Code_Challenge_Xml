// Node js libary allowing RPC Remote procedure call
var hprose = require("hprose");
// Node js libary allowing to convert to XMLHttpRequest
const DOMParser = require('xmldom').DOMParser;

function xmlParse(xml_data){
    let val, doc, declaration, command, site_id;
    let errors = [];

    // Reading in doc overriding error handler to get errors
    doc  = new DOMParser({
        errorHandler: {
           warning: (msg) => {errors.push(msg)},
           error: (msg) => {errors.push(msg)},
           fatalError: (msg) =>  {errors.push(msg)},
        },
    }).parseFromString(xml_data);

    if(errors.length == 0) val = 0;
    else return errors;

    // Retriving the Declaration, Command
    declaration  = doc.getElementsByTagName("Declaration");
    command  = declaration[declaration.length-1].attributes.getNamedItem("Command").value;
    // Site_id the Declaration, Command
    site_id  = doc.getElementsByTagName("SiteID")[0].childNodes[0].nodeValue;
    
    // Checks for DEFAULT AND DUB
    if(command == "DEFAULT") val = -1;
    if(site_id == "DUB") val = -2;
    
    // RETURN based on (VAL) value
    if(val == 0) return [val + ' - correct structure.']; 
    else if(val == -1) return [val + ' - invalid command specified.'];
    else if(val == -2) return [val + ' - invalid Site specified.'];
}

// Creating the server and adding the function to the server
var server = hprose.Server.create("http://127.0.0.1:8080");
server.addFunction(xmlParse);
server.start();
console.log("Server started...");