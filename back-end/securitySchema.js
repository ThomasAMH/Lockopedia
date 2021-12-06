const mongoose = require("mongoose");

const securitySchema = new mongoose.Schema({
  productName: String,
  coreSecurity: {
    canBeBumped: String,
    canBeBypassed: String,
    canBeImpressioned: String,
    coreRarity: String,
    destructionResistance: String,
    pickResistance: String,
    securityIndex: String,
    pullingResistance: String,
    vulerableTo: String,
  },
  bodySecurity: {
    canBeShimmed: String,
    canBeBypassed: String,
    cutResistance: String,
    drillResistance: String,
    grindingResistance: String,
    impactResistance: String,
    meltResistance: String,
    pryResistance: String,
    snapResistance: String,
    disassembleResistance: String,
},
});

const securityInfo = mongoose.model("SecurityDescription", securitySchema);

module.exports = securityInfo;
