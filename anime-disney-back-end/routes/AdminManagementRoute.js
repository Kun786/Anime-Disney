const expres = require('express');
const Router = expres.Router();


const { AdminLogin, AdminRegister, AddAdminEarnings, GetAdminDetails, ResetUsersVideoArray } = require('../controllers/AdminManagementController')
const _UploadAdminImage = require('../libraryfiles/UploadAdminImage');
const _ProtectRoutes = require('../libraryfiles/RoutesAuthentication');

//Embdedded Data Route
Router.post('/AdminLogin',AdminLogin);
Router.post('/AdminRegister',_UploadAdminImage.UploadAdminImage.single('AdminImage'),AdminRegister);
Router.post('/AddAdminEarnings',AddAdminEarnings);
Router.get('/GetAdminDetails',GetAdminDetails);
Router.get('/ResetUsersVideoArray',ResetUsersVideoArray);
module.exports = Router;