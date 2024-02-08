// delete-quote-service.js
const Express = require("express");
const MongoClient = require("mongodb").MongoClient;
const cors = require("cors");

const app = Express();
app.use(cors());

const CONNECTION_STRING = "mongodb://database:27017";
const DATABASE_NAME = "quoteapp";
let database;

app.listen(5043, () => {
  MongoClient.connect(CONNECTION_STRING, (error, client) => {
    database = client.db(DATABASE_NAME);
    console.log("MongoDB Connection Successful");
  });
});

app.delete('/api/quoteapp/delete-quote', (request, response) => {
  const quoteId = request.query.id;
  database.collection("quoteappcollection").deleteOne({
    id: quoteId
  }, (error) => {
    if (error) {
      response.status(500).json("Delete Failed");
    } else {
      response.json("Delete Successfully");
    }
  });
});
