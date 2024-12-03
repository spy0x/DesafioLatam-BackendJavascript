import express from "express";
import dotenv from 'dotenv';
import {viewsRouter} from "./routes/viewsRouter.js";
import {beersRouter} from "./routes/beersRouter.js";
import {authRouter} from "./routes/authRouter.js";

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

