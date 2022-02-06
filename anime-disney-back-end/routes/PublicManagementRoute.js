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
const { UploadPublicVideo } = require('../libraryfiles/UploadPublicVideo');
const { UploadPublicPicture } = require('../libraryfiles/UploadPublicPicture');

//Embdedded Data Route
Router.post('/PostPublicLogo',UploadPublicLogo.single('Logo'),PostPublicLogo);
Router.post('/PostPublicGif',UploadPublicGif.single('Gif'),PostPublicGif);
Router.post('/PostPublicMusic',UploadPublicMusic.single('Music'),PostPublicMusic);
Router.post('/PostPublicVideo',UploadPublicVideo.single('Video'),PostPublicVideo);
Router.post('/PostPublicPicture',UploadPublicPicture.single('PublicPicture'),PostPublicPicture);
module.exports = Router;