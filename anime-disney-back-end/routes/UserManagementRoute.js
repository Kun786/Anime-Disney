const expres = require('express');
const Router = expres.Router();


const { UserLogin, UserRegister } = require('../controllers/UserManagementController');
const {UploadUserImage} = require('../libraryfiles/UploadUserImage');


//Embdedded Data Route
Router.post('/UserLogin',UserLogin);
Router.post('/UserRegister',UserRegister );
module.exports = Router;