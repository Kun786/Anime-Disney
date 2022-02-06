const expres = require('express');
const Router = expres.Router();


const { 
    PostPublicLogo, 
    PostPublicGif, 
    PostPublicMusic, 
    PostPublicVideo, 
    PostPublicPicture, 
    PostPublicBackground, 
    PostPublicAboutUs 
} = require('../controllers/PublicManagementController');
const { UploadPublicLogo } = require('../libraryfiles/UploadPublicLogo');


//Embdedded Data Route
Router.post('/PostPublicLogo',UploadPublicLogo.single('Logo'),PostPublicLogo);
module.exports = Router;