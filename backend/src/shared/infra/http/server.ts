import 'dotenv/config'
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors'
import "express-async-errors";
import 'reflect-metadata';
import routes from './routes';
import uploadConfig from '@config/upload'
import '@shared/infra/typeorm';
import '@shared/container';
import AppError from '@shared/errors/AppError';
import { errors } from 'celebrate'


const app = express();
app.use(cors())
app.use(express.json());
app.use('/files', express.static(uploadConfig.directoryUploads));
app.use(routes);
app.use(errors());
app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
        return response.status(error.statusCode).json({
            status: 'error',
            message: error.message,
        })
    }
    return response.status(500).json({
        status: 'error',
        message: "Internal server error, " + error,
    })
});

app.listen(3333, () => {
    console.log('Server stared on port 3333!');
});