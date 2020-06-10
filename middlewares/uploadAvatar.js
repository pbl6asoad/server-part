
const multer = require('multer')
const v4  = require('uuid')

const storage = multer.diskStorage({
     destination: function(req,file,cb) {
         cb(null, `./uploads`);
     },
     filename: (req, file, cb) => {
         cb(null, v4().toString() + "_" + file.originalname);
     }
   });

const fileFilter= (req, file, cb) => {
     if (file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
         cb(null, true);
     } else {
         cb(new Error("Type file is not access"));
     }
   };


module.exports = multer({
    storage,
    fileFilter,
    limits: {fileSize: 1024 * 1024 * 5} // 5 Мегабайт
  }).single('avatar');