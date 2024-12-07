import express from "express";
import dotenv from 'dotenv';
import {viewsRouter} from "./routes/views.route";
import {beersRouter} from "./routes/beers.route";
import {authRouter} from "./routes/auth.route";

dotenv.config();

export const app = express();

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// ROUTER
app.use("/api/beers", beersRouter);
app.use("/auth", authRouter);
app.use("/", viewsRouter);

// RUN SERVER
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

