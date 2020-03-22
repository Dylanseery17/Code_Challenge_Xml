// Node js libary allowing RPC Remote procedure call
var hprose = require("hprose");
// Proxy to talk to server on port 8080
var client = hprose.Client.create("http://127.0.0.1:8080/");
var proxy = client.useService(["xmlParse"]);
// Node js libary allowing to convert to XMLHttpRequest
const DOMParser = require('xmldom').DOMParser;
const fs = require('fs');

// Express.js for routing client side application
const express = require('express');
const app = express();
const port = 3000;

app.get('/', async (req, res) => {
    try {
        // File read in and setup
        let data = fs.readFileSync('data.xml', 'utf8').toString();
        // Altering XML FILE Can be commented Test functions
        data =  await change_Command(data.toString());
        data = await change_Site_id(data.toString());
        const result = await proxy.xmlParse(data);
        // Displaying the result on webpage
        res.send(result);
    } catch (error) {
        res.send("Error sending file to server");
    }
});

// Testing changing the command from DEFAULT 
const change_Command = (xml) => {
    let errors = [];

    // Reading in doc overriding error handler to get errors
    let doc  = new DOMParser({
        errorHandler: {
           warning: (msg) => {errors.push(msg)},
           error: (msg) => {errors.push(msg)},
           fatalError: (msg) =>  {errors.push(msg)},
        },
    }).parseFromString(xml);

    if(errors.length > 0) return errors.toString();

    // Changing the Declaration Command From DEFAULT To NOT_DEFAULT
    let declaration  = doc.getElementsByTagName("Declaration");
    declaration[declaration.length-1].attributes.getNamedItem("Command").value = "NOT_DEFAULT";


    return doc;
}

const change_Site_id = (xml) => {
    let errors = [];

    // Reading in doc overriding error handler to get errors
    let doc  = new DOMParser({
        errorHandler: {
           warning: (msg) => {errors.push(msg)},
           error: (msg) => {errors.push(msg)},
           fatalError: (msg) =>  {errors.push(msg)},
        },
    }).parseFromString(xml);

    if(errors.length > 0) return errors.toString();

    // Changing the SiteID From DUB To LDN
    let site_id = doc.getElementsByTagName("SiteID")
    site_id[0].childNodes[0].data = "LDN";

    return doc.toString();
}

app.listen(port, () => console.log('Client side running on port '+ port));