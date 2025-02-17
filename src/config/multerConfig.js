import multer from 'multer';
import path from 'path';
import appRoot from 'app-root-path';

// Cấu hình bộ lọc ảnh
const imageFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

// Cấu hình lưu trữ
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, appRoot + '/src/public/images/');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Khởi tạo Multer với giới hạn số file và bộ lọc ảnh
const upload = multer({
    storage: storage,
    fileFilter: imageFilter,
    limits: {
        files: 5 // Giới hạn đúng 5 file
    }
});

export { upload };
