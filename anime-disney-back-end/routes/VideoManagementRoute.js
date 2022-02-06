// Dependencies
const expres = require('express');
const Router = expres.Router();
//Dependencies

//Calling Controllers Here
const { AddVideo, GetVideoByPackage, GetAllVideo, DeleteVideo } = require('../controllers/VideoManagementController');
const { UploadVideo } = require('../libraryfiles/UploadVideo');
//Calling Controllers Here


//Routes Definitions
Router.post('/AddVideo',UploadVideo.single('VideoData'),AddVideo);
Router.post('/GetVideoByPackage',GetVideoByPackage);
Router.get('/GetAllVideo',GetAllVideo);
Router.delete('/DeleteVideo/:_VideoId',DeleteVideo)
//Routes Definitions

module.exports = Router;