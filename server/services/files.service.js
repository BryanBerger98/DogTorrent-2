const fs = require('fs');
const multer = require('multer');
const crypto = require('crypto');
const path = require('path');

class FilesService {

    storage = multer.diskStorage({
        destination: './torrents/',
        filename: (req, file, cb) => {
            crypto.pseudoRandomBytes(16, (err, raw) => {
                if (err) return cb(err);
                cb(null, raw.toString('hex') + '-' + path.basename(file.originalname).replace(/\s/g,''));
            });
        }
    });
    
    upload = multer({ storage: this.storage, limits: 1024 * 102400 });

    constructor() {}

    unlinkFile(filename) {
        return new Promise((resolve, reject) => {
            fs.unlink('./torrents/' + filename, (error, file) => {
                if (error) reject(error);
                resolve(file);
            });
        });
    }

    deleteFile(filePath) {
        return new Promise((resolve, reject) => {
            fs.unlink(filePath, (error, file) => {
                if (error) reject(error);
                resolve(file);
            });
        });
    }

    checkFileExistance(filePath) {
        return fs.existsSync(filePath);
    }

    writeFile(fileName) {
        return fs.createWriteStream('./tmp/' + fileName);
    }

    getFilePath(filename, fileDir) {
        return path.resolve(__dirname, `../${fileDir}/${filename}`);
    }

}

module.exports = FilesService;
