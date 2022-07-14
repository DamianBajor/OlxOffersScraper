import express from 'express';
import { rootRouter } from './routes';
import cors from 'cors';
import * as errorHandlers from './handlers/errorHandler';

const app = express();

app.use(cors());

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/', rootRouter);

app.use(errorHandlers.notFound);
app.use(errorHandlers.validation)

export const App = app;
