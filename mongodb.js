const MongoClient = require("mongodb").MongoClient;

// Connection URL
const url = "mongodb://localhost:27017";

// Database Name
const dbName = "myproject";

// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
  if (err) throw console.error();

  console.log("Connected successfully to server");

  const db = client.db(dbName);
  db.collection("form").insertOne({
    name: "form1"
  });
  client.close();
});
