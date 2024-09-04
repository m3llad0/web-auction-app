import Server from "./providers/server";
import * as functions from 'firebase-functions';
import express from "express";
import UserController from "./controllers/userController";
import itemController from "./controllers/itemController";
import cors from "cors";
import { ENVIRONMENT } from "./config";

const app = new Server({
    env: ENVIRONMENT,
    controllers: [
        UserController.getInstance(),
        itemController.getInstance(),
    ],
    middlewares: [
        express.json(),
        express.urlencoded({ extended: true }),
        cors()
    ]
});

export const api = functions.https.onRequest(app.getApp());