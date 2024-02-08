// get-quotes-service.js
const Express = require("express");
const MongoClient = require("mongodb").MongoClient;
const cors = require("cors");

const app = Express();
app.use(cors());

const CONNECTION_STRING = "mongodb://database:27017";
const DATABASE_NAME = "quoteapp";
let database;

app.listen(5041, () => {
  MongoClient.connect(CONNECTION_STRING, (error, client) => {
    database = client.db(DATABASE_NAME);
    console.log("MongoDB Connection Successful");
  });
});


app.get('/api/quoteapp/get-quotes', (request, response) => {
  database.collection("quoteappcollection").find({}).toArray((error, result) => {
    response.send(result);
  });
});
