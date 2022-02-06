const mongoose = require('mongoose');

//Start Block Schema Creating
const WithDrawlSchema = mongoose.Schema({
    UserId:{ type:String, required:true },
    FullName:{ type:String, required:true },
    UserName:{ type:String, required:true },
    Mobile: {type:String, required: true},
    UserCurrentEarnings:{ type:Number, required:true },
    UserWithDrawAmmount:{ type:Number, required:true },
    AccountType:{ type:String, required:true },
    Status:{ type:Number, default:0},
    CreatedDate: { type: Date, default: Date.now() }
})
//End Block Schema Creating

//Exporting The Schema
module.exports = mongoose.model('WithDrawlCollection', WithDrawlSchema);