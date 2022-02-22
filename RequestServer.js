const express       = require('express')
const app           = express()
const cors = require("cors");
var Database = require('arangojs').Database
const username = 'root' //default user
const password = '' //blank password by default
const database = '_system'
//Please run ArangoDbSoftSetup.js first before executing this script
var db = new Database('http://127.0.0.1:8529');
db.useBasicAuth(username, password);
db.useDatabase('mydb2');
collection = db.collection("Collection1");
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
//If you are running react Application on any other origin please modify the value below
app.options("*", cors({ origin: 'http://localhost:3000', optionsSuccessStatus: 200 }));
app.use(cors({ origin: "http://localhost:3000", optionsSuccessStatus: 200 }));


  
//Right now just handling POST requests

app.post('/submit', (req, res) => {
    console.log(req.body)
	var storedReference=storeRequest(req.body,collection);
	console.log(storedReference);
    return res.send("went well")
})

//Server will listen on 3001 port
app.listen(3001, () => {
    console.log("running on port 3001")
})

//Logic to generate Reference Number based on timestamp
function uniqueNumber() {
    var date = Date.now();

    // If created at same millisecond as previous
    if (date <= uniqueNumber.previous) {
        date = ++uniqueNumber.previous;
    } else {
        uniqueNumber.previous = date;
    }

    return date;
}

//To Store JSON requests received under POST request
function storeRequest(jsonObject,collection)
{
  var requestid = uniqueNumber();
  jsonObject._key="request_".concat(requestid);
  collection.save(jsonObject).then(
  meta => {console.log('Document saved:', meta._rev)},
  err => console.error('Failed to save document:', err)
);


	return ("request_".concat(requestid));

}

