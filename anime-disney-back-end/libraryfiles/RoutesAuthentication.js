//Dependencies
const jwt = require('jsonwebtoken');
//Dependencies


//Block Start MiddleWare For Routes Protection.

let ProtectRoute = (req,res,next)=>{
try {
    const _GetToken = req.headers.authorization;
    console.log(_GetToken);
} catch (error) {
    res.json({
        Message:'Authorization Failed',
        Status: null
    })
}
}

module.exports = {ProtectRoute};
//Block Ends MiddleWare For Routes Protection.