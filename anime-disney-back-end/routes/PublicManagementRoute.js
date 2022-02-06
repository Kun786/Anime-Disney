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
const { UploadPublicGif } = require('../libraryfiles/UploadPublicGif');
const { UploadPublicMusic } = require('../libraryfiles/UploadPublicMusic');

//Embdedded Data Route
Router.post('/PostPublicLogo',UploadPublicLogo.single('Logo'),PostPublicLogo);
Router.post('/PostPublicGif',UploadPublicLogo.single('Gif'),PostPublicGif);
module.exports = Router;