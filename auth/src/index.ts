import express from "express";
import "express-async-errors";
import mongoose from "mongoose";
import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";
import { errorHandler } from "./middlewars/error-handler";
import { NotFoundError } from "./errors/not-found-error";
import { Request, Response } from "express";

const app = express();


app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all('*', async (req: Request, res: Response) => {
	throw new NotFoundError();
});
app.use(errorHandler);
const start = async () => {
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