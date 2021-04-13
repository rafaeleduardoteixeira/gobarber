import path from "path";
import multer, { StorageEngine } from "multer";
import crypto from "crypto";

const tmpFolder = path.resolve(__dirname, "..", "..", "tmp");
const tmpFolderUploads = path.resolve(__dirname, "..", "..", "tmp", 'uploads');

interface IUploadConfig {
  driver: 's3' | 'disk'
  directory: string
  directoryUploads: string;
  storage: StorageEngine
}

export default {
  driver: process.env.STORAGE_DRIVER,
  directory: tmpFolder,
  directoryUploads: tmpFolderUploads,
  storage: multer.diskStorage({
    destination: tmpFolder,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString("hex");
      const fileName = `${fileHash}-${file.originalname}`;
      return callback(null, fileName);
    },
  }),
} as IUploadConfig
