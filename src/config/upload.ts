import path from 'path';
import multer from 'multer';
import crypto from 'crypto';

const uploadFolder = path.resolve(__dirname, '..', '..', 'uploads');
const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

export default {
	directory: uploadFolder,
	tmpFolder,
	storage: multer.diskStorage({
		destination: uploadFolder,
		filename(req, file, callback) {
			const fileHash = crypto.randomBytes(10).toString('hex');

			const filename = `${fileHash}-${file.originalname}`;

			callback(null, filename);
		},
	}),
};
