const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SaltRounds = 10;

const UserSchema = mongoose.Schema({
    Name: { type: String, required: true},
    Email: { type: String, required: true},
    DOB: { type: String, required: true },
    Gender: { type: String, required: true },
    Password: { type: String, required: true },
    PassCode: { type: String, required: true }
})

UserSchema.pre('save', function(next){
    bcrypt.genSalt(SaltRounds,(err,salt)=>{
        if(salt){
        this.SaltString=salt;
        bcrypt.hash(this.Password,salt,(err,hash)=>{
            this.Password=hash;
            next();
        })
    }
    else {
        res.json({
            Error:err.message
        })
    }
    })
});





module.exports = mongoose.model('UserCluster', UserSchema);