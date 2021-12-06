const mongoose = require("mongoose");

const lockSchema = new mongoose.Schema({
  bodyMaterial: String,
  bodyDimensions: String,
  coreType: String,
  coreMaterial: String,
  coreElements: String,
  description: String,
  image: String,
  keywayType: String,
  lockType: String,
  pinMaterial: String,
  productName: String,
  recommendedUses: String,
  shackleMaterial: String,
  shackleThickeness: String,
  // sources: [
  //   {
  //     sourceType: String,
  //     sourceProoves: String,
  //   }
  // ],

  //Weight
  //Pin pinMaterial
  //Body and interior objects??

});

const lockDescription = mongoose.model("Lock", lockSchema);

module.exports = lockDescription;
