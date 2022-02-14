const mongoose = require('mongoose');

// Date
const today = new Date();
const day = today.getDate();
const month = today.getMonth() + 1;
const year = today.getFullYear();

//Start Block for Schema Creating
const PublicChatSchema = mongoose.Schema({
    UserName:{ type: String, default: 'default'},
    Message: { type: String },
    CreatedDate: {
        type: String,
        default: `${year}-${month}-${day}`,
    },
}, { timestamps: true });
//End Block for Schema Creating

module.exports = mongoose.model('PublicChatCollection', PublicChatSchema);