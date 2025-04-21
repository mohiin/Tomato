import express from "express";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import "dotenv/config"

import {sessionOptions} from "./config/session.js";
import userModel from "./models/userModel.js";
import connectDB from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoutes.js";
import { frontendUrl } from "./config/url.js";

//app config
const app = express();
const port = process.env.PORT || 3000;

app.set("trust proxy", 1);

//Middlewares
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors({
    origin: `${frontendUrl}`, // specify the client’s origin
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true // allow credentials like cookies or HTTP authentication
  }));

app.use(session(sessionOptions));

app.use(passport.initialize());
app.use(passport.session());
passport.use(userModel.createStrategy());

passport.serializeUser(userModel.serializeUser());
passport.deserializeUser(userModel.deserializeUser());

//Database connectiion
connectDB();

//api endpoints
app.use("/food", foodRouter);
app.use("/user", userRouter);
app.use("/cart", cartRouter);
app.use("/order", orderRouter);

app.get("/", (req, res) =>{
    res.send("server is running!");
});

app.listen(port, () =>{
    console.log("App is listing on port:", port);
});
