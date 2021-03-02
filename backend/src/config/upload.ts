import path from "path";
import multer, { StorageEngine } from "multer";
import crypto from "crypto";

const tmpFolder = path.resolve(__dirname, "..", "..", "tmp");

interface IUploadConfig {
  driver: 's3' | 'disk'
  directory: string
  storage: StorageEngine
}

export default {
  driver: process.env.STORAGE_DRIVER,
  directory: tmpFolder,
  storage: multer.diskStorage({
    destination: tmpFolder,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString("hex");
      const fileName = `${fileHash}-${file.originalname}`;
      return callback(null, fileName);
    },
  }),
} as IUploadConfig
