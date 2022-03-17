import express from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';

import { Request, Response } from "express";
import { errorHandler, NotFoundError, currentUser } from "@cutickets/common";
import { createTicketRouter } from './routes/new';
import { showTicketRouter } from "./routes/show";
import { indexTicketRouter } from "./routes/index";
import { updateTicketRouter } from "./routes/update";

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));

app.set('trust proxy', true);

app.use(
    cookieSession({
        signed: false,
        secure: process.env.NODE_ENV !== 'test',
    })
);

app.use(currentUser);


app.use(createTicketRouter);
app.use(showTicketRouter);
app.use(indexTicketRouter);
app.use(updateTicketRouter);

app.all('*', async (req: Request, res: Response) => {
    throw new NotFoundError();
});
app.use(errorHandler);

export { app };
