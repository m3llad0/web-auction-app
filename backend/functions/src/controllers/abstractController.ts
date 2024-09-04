import { Router } from "express";

export default abstract class AbstractController {
    private _router: Router = Router();
    private _prefix: string;

    public get prefix():string {
        return this._prefix;
    }
    public get router(): Router{
        return this._router;
    }
    protected constructor(prefix: string) {
        this._prefix = prefix;
        this.initRoutes();
    }

    /*Initialiaze routes*/
    protected abstract initRoutes(): void;
    // Check request body
    protected abstract validateBody(type: any): any;
}