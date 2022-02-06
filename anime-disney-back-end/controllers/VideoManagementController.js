// Dependencies
const fs = require('fs');

//Aqruiring Model
const _VideoModelSchema = require('../models/VideoManagementModel');


const AddVideo = async (req, res) => {
    try {
        
        if (req.file !== undefined) {
            const _VideoModelToSave = new _VideoModelSchema({
                PackageName: req.body.PackageName,
                VideoUrl: `Products/${req.body.PackageName}/${req.file.filename}`,
                VideoName: req.file.originalname,
                VideoType: req.file.mimetype,
                Status: 1 // It Mean Video is Added to Database by Upload Method
            })
            const _VideoData = await _VideoModelToSave.save();
            return res.json({
                Message: `Product Uploaded Successfully!`,
                Data: true,
                Result: _VideoData
            })
        }

        if (req.file === undefined) {
            const _VideoModelToSave = new _VideoModelSchema({
                PackageName: req.body.PackageName,
                VideoUrl: req.body.VideoData,
                Status: 0, // It mean Video is Added to Database by Link Method
                VideoName: null,
                VideoType: null
            })
            const _VideoData = await _VideoModelToSave.save();
            return res.json({
                Message: `Video Has Added By Link Method`,
                Data: true,
                Result: _VideoData
            })
        }
    }
    catch (error) {
        res.json({
            Message: error.message,
            Data: false,
            Result: null
        })
    }
}


const GetVideoByPackage = async (req, res) => {
    
    try {
        const _PackageName = req.body;
        const _GetUserDataAccrodingToPackage = await _VideoModelSchema.find({ PackageName: _PackageName });
        
        if (_GetUserDataAccrodingToPackage.length > 0) {
            return res.json({
                Message: 'Video Found Successfully',
                Data: true,
                Result: _GetUserDataAccrodingToPackage
            })
        }

        if (_GetUserDataAccrodingToPackage <= 0) {
            return res.json({
                Message: 'There is no Such Video',
                Data: false,
                Result: null
            })
        }
    } catch (error) {
        res.json({
            Message: error.message,
            Data: false,
            Result: null
        })

    }
}

const GetAllVideo = async (req, res) => {
    try {
        const _GetAllVideos = await _VideoModelSchema.find();
        if (_GetAllVideos !== null) {
            return res.json({
                Message: 'Data Found Successfully',
                Data: true,
                Result: _GetAllVideos
            })
        }
        if (_GetAllVideos === null) {
            return res.json({
                Message: 'Data not Found Successfully',
                Data: false,
                Result: null
            })
        }
    } catch (error) {
        res.json({
            Message: error.message,
            Data: false,
            Result: null
        })
    }
}

const DeleteVideo = async (req, res) => {
    try {
        const _GetVideoId = req.params._VideoId;
        const _FindVideoFromDataBase = await _VideoModelSchema.findOne({ _id: _GetVideoId });
        if (_FindVideoFromDataBase !== null) {
            if (_FindVideoFromDataBase.Status === 0) {
                await _VideoModelSchema.remove({_id:_GetVideoId});
                return res.json({
                    Message: 'Video Has Deleted Successfully',
                    Data: true,
                    Result: _FindVideoFromDataBase
                })
            }

            if (_FindVideoFromDataBase.Status === 1) {
                fs.unlinkSync(`./assets/${_FindVideoFromDataBase.VideoUrl}`);
                await _VideoModelSchema.remove({_id:_GetVideoId});
                return res.json({
                    Message: 'Video Has Deleted Successfully',
                    Data: true,
                    Result: _FindVideoFromDataBase
                })
            }
        }

        if (_FindVideoFromDataBase === null) {
            res.json({
                Message: 'There is no Such Video',
                Data: false,
                Result: null
            })
        }
    } catch (error) {
        res.json({
            Message: error.message,
            Data: false,
            Result: null
        })
    }
}

module.exports = { AddVideo, GetVideoByPackage, GetAllVideo, DeleteVideo }