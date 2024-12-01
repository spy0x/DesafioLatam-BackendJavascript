import express from "express";
import dotenv from 'dotenv';
import {viewsRouter} from "./routes/viewsRouter";
import {beersRouter} from "./routes/beersRouter";
import {authRouter} from "./routes/authRouter";

dotenv.config();

const app = express();

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

