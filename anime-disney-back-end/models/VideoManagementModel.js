const mongoose = require('mongoose');

//Start Block Schema Creating
const VideoSchema = mongoose.Schema({
    PackageName: { type: String},
    VideoUrl: { type: String },
    VideoName: { type: String },
    VideoType: { type: String },
    Status: {type:Number}
})
//End Block Schema Creating

//Exporting The Schema
module.exports = mongoose.model('VideoCollection', VideoSchema);