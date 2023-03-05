import express, { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import { corsOrigin, environment } from './config/app';
import Logger from './core/log/logger';
import {
	NotFound,
	AppError,
	InternalServerError,
	ErrorType,
} from './core/handler/app-error';
import routes from './routes';

/*----------------------------------------*/
import './database'; // Connect to MongoDB
import './cache' // Cache
/*----------------------------------------*/

process.on('uncaughtException', (e) => {
	Logger.error(e);
});


const app = express();


/*----------------------------------------*/
app.use(morgan('dev'));
app.use(express.json({ limit: '10mb' }));
app.use(cors({ origin: corsOrigin, optionsSuccessStatus: 200 }));
app.use(bodyParser.json());
app.use(
	express.urlencoded({ limit: '10mb', extended: true, parameterLimit: 50000 }),
);
/*----------------------------------------*/


/*----------------------------------------*/
app.use('/api', routes);
app.use((req, res, next) => next(new NotFound()));
/*----------------------------------------*/


/* --------------------- MIDDLEWARE ERROR HANDLER --------------------- */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
	if (err instanceof AppError) {
		AppError.handle(err, res);
		if (err.type === ErrorType.INTERNAL_SERVER_ERROR)
			Logger.error(
				`500 - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`,
			);
	} else {
		Logger.error(
			`500 - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`,
		);
		Logger.error(err);
		if (environment === 'development') {
			return res.status(500).send(err);
		}
		AppError.handle(new InternalServerError(), res);
	}
});
/* ------------------------------------------------------------------- */

export default app;