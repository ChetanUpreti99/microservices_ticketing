import express from "express";
import "express-async-errors";
import mongoose from "mongoose";
import cookieSession from 'cookie-session';

import { currentUserRouter } from "./routes/current-user";
import { signInRouter } from "./routes/signIn";
import { signOutRouter } from "./routes/signOut";
import { signupRouter } from "./routes/signup";
import { errorHandler, NotFoundError } from "@cutickets/common";

import { Request, Response } from "express";

const app = express();
app.set('trust proxy', true);
app.use(
	cookieSession({
		signed: false,
		secure: true
	})
);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));

app.use(currentUserRouter);
app.use(signInRouter);
app.use(signOutRouter);
app.use(signupRouter);

app.all('*', async (req: Request, res: Response) => {
	throw new NotFoundError();
});
app.use(errorHandler);
const start = async () => {
	if (!process.env.JWT_KEY) {
		throw new Error('JWT_KEY must be defined');
	}
	try {
		await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
		console.log('Connected to MongoDb');
	} catch (err) {
		console.error(err);
	}

	app.listen(3000, () => {
		console.log('Listening on port 3000!!!!!!!!');
	});
};

start();