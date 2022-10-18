const multer = require('multer')
const path = require('path')
const crypt = require('crypto')

module.exports = {
    dest: path.resolve(__dirname, '..', '..', 'uploads'),
    storage: multer.diskStorage({
        destination: (req: Request, file: any, cb: any) => {
            cb(null, path.resolve(__dirname, '..', '..', 'uploads'));
        },
        filename: (req: Request, file: any, cb: any) => {
            crypt.randomBytes(16, (err: any, hash: any) => {
                if (err) cb(err);

                const fileName = `${hash.toString('hex')}-${file.originalname}`;

                cb(null, fileName);
            })
        }
    }),
    limits: {
        fileSize: 2 * 1024 * 1024,
    },
    fileFilter: (req: Request, file: any, cb: any) => {
        const allowedMimes = [
            'image/jpg',
            'image/jpeg',
            'image/pjpeg',
            'image/png',
            'image/gif',
        ];
        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type.'));
        }
    },
};