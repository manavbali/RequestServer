var Database = require('arangojs').Database
const username = 'root' //default user
const password = '' //blank password by default
const database = '_system'

var db = new Database('http://127.0.0.1:8529');
db.useBasicAuth(username, password);


//Create database
db.createDatabase('mydb2').then(
    () => console.log('Database created'),
    err => console.error('Failed to create database:', err)
  );
  //Switch and use the database



  db.useDatabase('mydb2');
  
  
  //Lets create the collection
  collection = db.collection("Collection1");
  
  
  collection.create().then(
  () => console.log('Collection created'),
  err => console.error('Failed to create collection:', err)
);

/*
This is a one time ArangoDB script to configure
Database and Collection.
Please run this before RequestServer.js


*/

