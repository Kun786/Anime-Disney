const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SaltRounds = 10;

const UserSchema = mongoose.Schema({
    Name: { type: String, required: true},
    UserName: { type: String, required: true,unique:true},
    Email: { type: String, required: true},
    Mobile: { type: Number, required: true },
    Package: { type: String, required: true },
    Password: { type: String, required: true },
    Referal:{type:String,default:''},
    Earnings:{type:Number, default:0},
    CreatedDate: { type: Date, default: Date.now },
    SaltString:{type:String},
    Status:{type:Number, default:2},
    VideoStatus:{type:Number, default:0},
    Tid:{type:String, default: '',unique:true},
    VideoArray:[],
    ReferralEarnings:{ type:Number, default:0},
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