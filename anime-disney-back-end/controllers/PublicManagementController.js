//Dependencies
const _PublicLogoModel = require('../models/PublicLogoModel');
const _PublicBackgroundModel = require('../models/PublicBackgroundModel');
const _PublicGifModel = require('../models/PublicGifModel');
const _PublicMusicModel = require('../models/PublicMusicModel');
const _PublicPictureModel = require('../models/PublicPictureModel');
const _PublicVideoModel = require('../models/PublicVideoModel');
const fs = require('fs');

//Start Block Change Logo
const PostPublicLogo = async (req, res) => {
    try {
        const { filename, originalname, mimetype } = req.file;

        const _CheckPublicLogoCollection = await _PublicLogoModel.find().lean();
        if(_CheckPublicLogoCollection.length>0){
            await _PublicLogoModel.remove();
            fs.unlinkSync(`./assets/${_CheckPublicLogoCollection[0].ImageUrl}`);
        }

        const _PublicLogoData = new _PublicLogoModel({
            ImageUrl:`Public/PublicLogo/${filename}`,
            ImageName:originalname,
            ImageType: mimetype
        })
        const _PublicLogoToSave = await _PublicLogoData.save();
        res.json({
            Message: 'Logo Saved Successfully',
            Data: true,
            Result: _PublicLogoToSave
        })
    } catch (error) {
        res.json({
            Message: error.message,
            Data: false,
            Result: null
        })
    }
}
//End Block Change Logo

//Start Block Change Gif
const PostPublicGif = async (req, res) => {
    try {
        const { filename, originalname, mimetype } = req.file;
        const _PublicGifData = new _PublicGifModel({
            ImageUrl:`Public/PublicGif/${filename}`,
            ImageName:originalname,
            ImageType: mimetype
        })
        const _PublicGifToSave = await _PublicGifData.save();
        res.json({
            Message: 'Gif Saved Successfully',
            Data: true,
            Result: _PublicGifToSave
        })
    } catch (error) {
        res.json({
            Message: error.message,
            Data: false,
            Result: null
        })
    }
}
//End Block Change Gif


//Start Block Change Music
const PostPublicMusic = async (req, res) => {
    try {
        const { filename, originalname, mimetype } = req.file;
        const _PublicMusicData = new _PublicMusicModel({
            MusicUrl:`Public/PublicMusic/${filename}`,
            MusicName:originalname,
            MusicType: mimetype
        })
        const _PublicMusicToSave = await _PublicMusicData.save();
        res.json({
            Message: 'Music Saved Successfully',
            Data: true,
            Result: _PublicMusicToSave
        })
    } catch (error) {
        res.json({
            Message: error.message,
            Data: false,
            Result: null
        })
    }
}
//End Block Change Music

//Start Block Change Video
const PostPublicVideo = async (req, res) => {
    try {
        const { filename, originalname, mimetype } = req.file;
        const _PublicVideoData = new _PublicVideoModel({
            VideoUrl:`Public/PublicVideo/${filename}`,
            VideoName:originalname,
            VideoType: mimetype
        })
        const _PublicVideoToSave = await _PublicVideoData.save();
        res.json({
            Message: 'Music Saved Successfully',
            Data: true,
            Result: _PublicVideoToSave
        })
    } catch (error) {
        res.json({
            Message: error.message,
            Data: false,
            Result: null
        })
    }
}
//End Block Change Video

//Start Block Change Picture
const PostPublicPicture = async (req, res) => {
    try {
        const { filename, originalname, mimetype } = req.file;
        const _PublicPictureData = new _PublicPictureModel({
            ImageUrl:`Public/PublicPicture/${filename}`,
            ImageName:originalname,
            ImageType: mimetype
        })
        const _PublicPictureToSave = await _PublicPictureData.save();
        res.json({
            Message: 'Music Saved Successfully',
            Data: true,
            Result: _PublicPictureToSave
        })
    } catch (error) {
        res.json({
            Message: error.message,
            Data: false,
            Result: null
        })
    }
}
//End Block Change Picture

//Start Block Change Background
const PostPublicBackground = async (req, res) => {
    try {
        const { filename, originalname, mimetype } = req.file;
        const _PublicBackgroundData = new _PublicBackgroundModel({
            ImageUrl:`Public/PublicPicture/${filename}`,
            ImageName:originalname,
            ImageType: mimetype
        })
        const _PublicBackgroundToSave = await _PublicBackgroundData.save();
        res.json({
            Message: 'Music Saved Successfully',
            Data: true,
            Result: _PublicBackgroundToSave
        })
    } catch (error) {
        res.json({
            Message: error.message,
            Data: false,
            Result: null
        })
    }
}
//End Block Change Background


//Start Block Public About Us
const PostPublicAboutUs = async (req, res) => {
    try {

    } catch (error) {

    }
}
//End Block Public About Us 

//Chat
//People are guest aur un ke profile picture jo top left pay hoo ge wo he hoo ge baki register walon ke alog hoo ga

module.exports = { PostPublicLogo, PostPublicGif, PostPublicMusic, PostPublicVideo, PostPublicPicture, PostPublicBackground, PostPublicAboutUs };