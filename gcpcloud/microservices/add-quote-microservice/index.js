// add-quote-service.js
const Express = require("express");
const MongoClient = require("mongodb").MongoClient;
const cors = require("cors");
const multer = require("multer");

const app = Express();
app.use(cors());

const CONNECTION_STRING = "mongodb://database:27017";
const DATABASE_NAME = "quoteapp";
let database;

app.listen(5042, () => {
  MongoClient.connect(CONNECTION_STRING, (error, client) => {
    database = client.db(DATABASE_NAME);
    console.log("MongoDB Connection Successful");
  });
});

app.post('/api/quoteapp/add-quote', multer().none(), (request, response) => {
  database.collection("quoteappcollection").count({}, function (error, numOfQuotes) {
    database.collection("quoteappcollection").insertOne({
      id: (numOfQuotes + 1).toString(),
      item: request.body.newQuotes
    });
    response.json("Added Successfully");
  });
});
