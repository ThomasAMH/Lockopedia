const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const upload = multer({
  dest:"../front-end/public/images"
});
const mongoose = require("mongoose");
const lockDescription = require("./lockSchema.js");
const securityInfo = require("./securitySchema");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));


mongoose.connect("mongodb://localhost:27017/Lockopedia", {
  useNewUrlParser: true
});


//Names of models
// lockDescription
// securityInfo

app.get("/api/locks", async (req,res) => {

  try {
      let allLocks = await lockDescription.find();
      res.send(allLocks);
  } catch(error)
  {
    console.log(error);
    console.log("Error in fetching lock data");
    res.sendStatus(500);
  }
});

app.get("/api/security", async (req, res) => {
  try {
      let allSecurity = await securityInfo.find();
      res.send(allSecurity);
  } catch(error)
  {
    console.log(error);
    console.log("Error in fetching security data");
    res.send(500);
  }
});

app.post("/api/newLock", async (req, res) => {
  try {
    const newEntry = {};
    for (property in req.body) {
      // if(newEntry[`${property}`] = "_id")
      //   {continue}
      newEntry[`${property}`] = req.body[property];
      console.log(1);
    }
    delete newEntry._id;
    console.log(newEntry);
    const newDocument = new lockDescription(newEntry);
    console.log(newDocument);
    await newDocument.save();
    // newDocument.save();
    // const newEntry = new lockDescription(
    //   req.body
    // )
    // console.log(newEntry);
    // newEntry.save();
    res.sendStatus(200);
    } catch(error) {
    console.log(error);
    console.log("error in post newlock - back end")
    res.sendStatus(500);
  }
});

app.put("/api/editlock", async(req, res) => {
  try {
    const editedItem = req.body;
    query = req.body._id;
    await lockDescription.findOneAndUpdate({ _id: query}, editedItem);
    res.sendStatus(200);
  } catch(error) {
    console.log(error);
    console.log("Error in EditLock - back end");
  }
});

app.delete("/api/deleteLock", async(req, res) => {
  try {
    const targetID = req.body;
    console.log(targetID._id);
    const targetLock = await lockDescription.findOne({_id: targetID});
    console.log(targetID);
    console.log(targetLock);
    await targetLock.remove();
    res.sendStatus(200);
  } catch(error) {
    console.log(error);
    console.log("Issue in deleting object - back end")
  }
});

app.listen(3000, () => {console.log("App listening on port 3000")});
