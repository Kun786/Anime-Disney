const expres = require('express');
const Router = expres.Router();


const { 
    PostPublicLogo, 
    PostPublicGif, 
    PostPublicMusic, 
    PostPublicVideo, 
    PostPublicPicture, 
    PostPublicBackground, 
    PostPublicAboutUs,
    GetPublicLogo 
} = require('../controllers/PublicManagementController');
const { UploadPublicLogo } = require('../libraryfiles/UploadPublicLogo');
const { UploadPublicGif } = require('../libraryfiles/UploadPublicGif');
const { UploadPublicMusic } = require('../libraryfiles/UploadPublicMusic');
const { UploadPublicVideo } = require('../libraryfiles/UploadPublicVideo');
const { UploadPublicPicture } = require('../libraryfiles/UploadPublicPicture');
const { UploadPublicBackground } = require('../libraryfiles/UploadPublicBackground');

//Embdedded Data Route
Router.post('/PostPublicLogo',UploadPublicLogo.single('Logo'),PostPublicLogo);
Router.post('/PostPublicGif',UploadPublicGif.single('Gif'),PostPublicGif);
Router.post('/PostPublicMusic',UploadPublicMusic.single('Music'),PostPublicMusic);
Router.post('/PostPublicVideo',UploadPublicVideo.single('Video'),PostPublicVideo);
Router.post('/PostPublicPicture',UploadPublicPicture.single('Picture'),PostPublicPicture);
Router.post('/PostPublicBackground',UploadPublicBackground.single('Background'),PostPublicBackground);
Router.get('/GetPublicLogo',GetPublicLogo);
module.exports = Router;