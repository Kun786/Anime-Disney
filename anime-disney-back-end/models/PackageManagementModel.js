const mongoose = require('mongoose');

//Start Block Schema Creating
const PackageSchema = mongoose.Schema({
    PackageName: { type: String, required: true },
    PackagePrice: { type: Number, required: true },
    AdsLimit: { type: Number, required: true },
    ClickRate: { type: Number, required: true },
    MinimumWithdrawl: { type: Number, required: true },
    ReferralClick: { type: Number, required: true },
    ReferralLimit: { type: Number, required: true },
    Duration: { type: Number, required: true },
    DailyEarnings: { type: Number, required: true },
})
//End Block Schema Creating

//Exporting The Schema
module.exports = mongoose.model('PackageCollection', PackageSchema);