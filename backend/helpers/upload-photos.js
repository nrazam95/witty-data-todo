const multer = require('@koa/multer');
const crypto = require('crypto');

const uploadPhotos = function () {
    this.upload = multer({
        storage: multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, 'uploads/');
            },
            filename: function (req, file, cb) {
                const newFileName = `${crypto.randomBytes(16).toString('hex')}${file.originalname}`;
                cb(null, newFileName);
            }
        })
    });

    this.uploadPhotos = function (ctx, next) {
        try {
            this.upload.single('files');
        } catch (err) {
            ctx.response.status = 500;
            ctx.response.body = {
                error: 'Error uploading photos.'
            };
        }
    }
}

module.exports = {
    uploadPhotos
}