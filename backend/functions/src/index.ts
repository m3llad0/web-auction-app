import Server from "./providers/server";
import * as functions from 'firebase-functions';
import express from "express";
import cors from "cors";
import { ENVIRONMENT } from "./config";
// import ContactFormController from "./controllers/contactFormController";

const app = new Server({
    env: ENVIRONMENT,
    controllers: [
        // ContactFormController.getInstance(),
    ],
    middlewares: [
        express.json(),
        express.urlencoded({ extended: true }),
        cors()
    ]
});

export const api = functions.https.onRequest(app.getApp());