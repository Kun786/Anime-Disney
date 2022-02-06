const expres = require('express');
const Router = expres.Router();


const { UserLogin, UserRegister, UpdateUserEarnings, GetUsers, GetUserById, UpdateUserStatus, DeactiveUserStatus, DeleteUser, GetReferedUserDetails, GetAllReferalUsers, UpdateUserTid, DailyUserRegisteration, UpdateVideoArrayForUser, GetUserVideoArrayById, UpdateUserEarningsByAdmin } = require('../controllers/UserManagementController');
const {UploadUserImage} = require('../libraryfiles/UploadUserImage');


//Embdedded Data Route
Router.post('/UserLogin',UserLogin);
Router.post('/UserRegister',UserRegister );
Router.put('/UpdateUserEarnings',UpdateUserEarnings);
Router.get('/GetUsers',GetUsers);
Router.get(`/GetUserById/:_Id`,GetUserById);
Router.put(`/UpdateUserStatus/:_Id`,UpdateUserStatus);
Router.post('/DeactivateUser/:_Id',DeactiveUserStatus);
Router.delete('/DeleteUser/:_Id',DeleteUser);
Router.post('/GetReferedUserDetails',GetReferedUserDetails);
Router.get('/GetAllReferalUsers',GetAllReferalUsers);
Router.post('/UpdateUserTid',UpdateUserTid);
Router.get('/DailyUserRegisteration',DailyUserRegisteration);
Router.post('/UpdateVideoArrayForUser',UpdateVideoArrayForUser);
Router.get('/GetUserVideoArrayById/:_UserId',GetUserVideoArrayById);
Router.post('/UpdateUserEarningsByAdmin', UpdateUserEarningsByAdmin)
module.exports = Router;