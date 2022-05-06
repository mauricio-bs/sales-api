import path from 'path';
import multer from 'multer';
import crypto from 'crypto';

interface IUploadConfig {
	driver: 's3' | 'disk';
	tmpFolder: string;
	directory: string;
	multer: {
		storage: multer.StorageEngine;
	};
	config: {
		aws: {
			bucket: string;
		};
	};
}

const uploadFolder = path.resolve(__dirname, '..', '..', 'uploads');
const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

export default {
	driver: process.env.STORAGE_DRIVER,
	directory: uploadFolder,
	tmpFolder,
	multer: {
		storage: multer.diskStorage({
			destination: uploadFolder,
			filename(req, file, callback) {
				const fileHash = crypto.randomBytes(10).toString('hex');

				const filename = `${fileHash}-${file.originalname}`;

				callback(null, filename);
			},
		}),
	},
	config: {
		aws: {
			bucket: 'udemy-sales-api',
		},
	},
} as IUploadConfig;
