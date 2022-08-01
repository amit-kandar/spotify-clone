const multer = require('multer')
const path = require('path')


const whitelist = [
    'image/png',
    'image/jpeg',
    'image/jpg'
]

const upload = multer({
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads/')
        },

        filename: function (req, file, cb) {
            cb(null, req.body.name + path.extname(file.originalname))
        }
    }),

    fileFilter: (req, file, cb) => {
        if (!whitelist.includes(file.mimetype)) {
            return cb(new Error('file is not allowed'))
        }
        cb(null, true)
    }
})

module.exports = upload