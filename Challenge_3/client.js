var hprose = require("hprose");
var client = hprose.Client.create("http://127.0.0.1:8080/");
var proxy = client.useService(["xmlParse"]);
// Node js libary allowing to convert to XMLHttpRequest
const DOMParser = require('xmldom').DOMParser;
const fs = require('fs');

const express = require('express');
const app = express();
const port = 3000;

app.get('/', async (req, res) => {
    try {
        let data = fs.readFileSync('data.xml', 'utf8').toString();
        data =  await change_Command(data.toString())
        data = await change_Site_id(data.toString());
        const result = await proxy.xmlParse(data);
        res.send(result);
    } catch (error) {
        res.send("Error sending file to server");
    }
});

const change_Command = (xml) => {
    let errors = [];

    let doc  = new DOMParser({
        errorHandler: {
           warning: (msg) => {errors.push(msg)},
           error: (msg) => {errors.push(msg)},
           fatalError: (msg) =>  {errors.push(msg)},
        },
    }).parseFromString(xml);

    if(errors.length > 0) return errors.toString();
    let declaration  = doc.getElementsByTagName("Declaration");
    declaration[declaration.length-1].attributes.getNamedItem("Command").value = "NOT_DEFAULT";


    return doc;
}

const change_Site_id = (xml) => {
    let errors = [];

    let doc  = new DOMParser({
        errorHandler: {
           warning: (msg) => {errors.push(msg)},
           error: (msg) => {errors.push(msg)},
           fatalError: (msg) =>  {errors.push(msg)},
        },
    }).parseFromString(xml);

    if(errors.length > 0) return errors.toString();

    let site_id = doc.getElementsByTagName("SiteID")
    site_id[0].childNodes[0].data = "LDN";

    return doc.toString();
}

app.listen(port, () => console.log('Client side running on port '+ port));