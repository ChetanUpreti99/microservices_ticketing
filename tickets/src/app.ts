import express from 'express';
import 'express-async-errors';

import { Request, Response } from "express";
import { errorHandler, NotFoundError } from "@cutickets/common";

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));

app.set('trust proxy', true);




app.all('*', async (req: Request, res: Response) => {
    throw new NotFoundError();
});

app.use(errorHandler);

export { app };
