// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import cors from 'cors';
import express from 'express';
import md5 from 'md5';
import { v4 as uuidv4 } from 'uuid';
import { RequestExtended } from './interfaces/global';
import routes from './routes';
import { logger } from './utils/logger';
import { migrate } from './migration';

const PORT = process.env.PORT || 8000;

const app = express();
app.use(cors());

app.use((req: RequestExtended, res, next) => {
	req.id = md5(uuidv4());
	req.traceId = req.header('eg-request-id') || '-';
	req.logId = [
		`traceId[${req.traceId}]`,
		`spanId[${req.id}]`,
		`user[${
			req.header('user.id')
				? req.header('user.id') + ',' + req.header('user.type')
				: '-'
		}]`,
	].join(' ');
	req.log = (...args: any[]) => {
		logger.info([new Date().toISOString(), req.logId, ...args].join(' '));
	};
	req.error = (...args: any[]) => {
		logger.error([new Date().toISOString(), req.logId, ...args].join(' '));
	};
	next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

migrate().catch((err) => {
	logger.error('Error while running migrations', err);
});


app.use(routes);

app.listen(PORT, () => {
	logger.info('Server is listening on port ' + PORT);
});
