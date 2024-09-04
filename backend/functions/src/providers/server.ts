import express from "express";
import db from "../models";
import { log, info, error } from "firebase-functions/logger";
/**
 * Server class for setting up an Express.js server.
 */
class Server{
    private app : express.Application;
    private env : string;

    /**
     * Constructor for the Server class.
     * @param {Object} appInit - Initialization parameters for the server.
     * @param {string} appInit.env - The environment in which the server is running.
     * @param {Array} appInit.controllers - The controllers to be loaded into the server.
     * @param {Array} appInit.middlewares - The middlewares to be loaded into the server.
     */
    constructor(appInit : {
        env: string;
        controllers: any[];
        middlewares: any[];

    }) {
        this.app = express();
        this.env = appInit.env;
        this.connectDB(); 
        this.loadMiddlewares(appInit.middlewares);
        this.loadControllers(appInit.controllers);
    }

    /**
     * Load the controllers into the server.
     * @param {Array} controllers - The controllers to be loaded.
     */
    private loadControllers(controllers: any[]){
        controllers.forEach((controller) => {
            this.app.use(`/${controller.prefix}`, controller.router);
        })
    }

    /**
     * Load the middlewares into the server.
     * @param {Array} middlewares - The middlewares to be loaded.
     */
    private loadMiddlewares(middlewares: any[]){
        middlewares.forEach((middleware) => {
            this.app.use(middleware);
        })
    }

    private async connectDB() {
        try {
            await db.sequelize.sync();
            log('Connected to the database');
        } catch (err) {
            // throw new Error('Failed to connect to the database');
            error('Failed to connect to the database:', err);
        }
    }

    /**
     * Get the Express application instance.
     * @returns {express.Application} The Express application instance.
     */
    public getApp(): express.Application {
        return this.app;
    }
}

export default Server;