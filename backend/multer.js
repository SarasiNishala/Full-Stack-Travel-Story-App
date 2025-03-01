const multer = require("multer");
const path = require("path");

// storage config
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "./uploads/"); // uploaded file path
    },
    filename: function (req, file, cb){
        cb(null, Date.now() + path.extname(file.originalname));
    }, 
});

//filter for only images
const fileFilter = ( req, file, cb) => {
    if(file.mimetype.startsWith("image/")){
        cb(null, true);
    } else {
        cb(new Error("Only images are allowed"), false);
    }
};

//multer instance
const upload = multer({ storage, fileFilter});

module.exports = upload;