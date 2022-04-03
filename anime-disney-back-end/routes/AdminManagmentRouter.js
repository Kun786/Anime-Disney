const expres = require('express');
const Router = expres.Router();


const { AdminLogin,
     AdminRegister 
    } = require('../controllers/AdminManagmentController');



//Embdedded Data Route
Router.post('/Adminlogin',AdminLogin);
Router.post('/RegisterAdmin',AdminRegister );
module.exports = Router;