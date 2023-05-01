const router = require('express').Router()
const cloudinary = require('cloudinary')
const { protect, authAdmin, authCustomer }  = require('../middleware/authMiddleware')
//const auth = require('../middleware/auth')
const fs = require('fs')


//We will upload image on cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

//upload images only by the Admin
router.post('/upload', authAdmin, (req, res) =>{
    try {
        console.log(req.files)
        if(!req.files || Object.keys(req.files).length === 0)
        return res.status(400).json({msg: 'NO FILES WERE UPLOADED'})

        const file = req.files.file
        if(file.size > 1024*1024) {//1024*1024 = 1mb
            // removeTmp(file.tempFilePath)
            return res.status(400).json({msg: 'Size is too large'})
        }
        if(file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png'){
            // removeTmp(file.tempFilePath)
            return res.status(400).json({msg: 'File format is unsupported'})
        }

        cloudinary.v2.uploader.upload(file.tempFilePath, {folder: "test"}, async(err, result)=>{
            if(err)throw err

            // removeTmp(file.tempFilePath)

            res.json({public_id: result.public_id, url: result.secure_url})

        })

    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
})

// authAdmin, 
//Delete a image
router.post('/destroy',authAdmin,(req, res) =>{
    try {
        const {public_id} = req.body;
        if(!public_id) return res.status(400).json({msg: "No images selected"})

        cloudinary.v2.uploader.destroy(public_id, async(err, result)=>{
            if(err) throw err;

            res.json({msg: 'Deleted'})
        })

    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
    
})

// const removeTmp = (path) =>{
//     fs.unlink(path, err=>{
//         if(err)throw err 
//     })
// }

module.exports = router 