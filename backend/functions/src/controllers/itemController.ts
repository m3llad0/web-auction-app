import { Request, Response } from "express";
import AbstractController from "./abstractController";
import {JwtPayload, verify} from "jsonwebtoken";
import Authorize from "../middleware/authMiddleware";
import { JWT_SECRET } from "../config";
import db from "../models";
import { error, log } from "firebase-functions/logger";


class ItemController extends AbstractController{
    protected validateBody(type: any) {
        throw new Error("Method not implemented.");
    }

    private static instance: ItemController;

    public static getInstance(): ItemController {
        if (!this.instance) {
            this.instance = new ItemController('item');
        }

        return this.instance
    }

    protected initRoutes(): void {
        this.router.get("/", Authorize, this.getAll);
        this.router.get("/:id", Authorize, this.getOne);
        this.router.post("/new-item", this.create);
        this.router.put("/:id", Authorize, this.update);
        this.router.delete("/:id", Authorize, this.delete);

        
    }

    private async getAll(request: Request, response: Response) {
        try {
            const items = await db.Item.findAll();

            return response.status(200).send(items);
        } catch (e) {
            error(e);
            return response.status(500).send({message: 'Internal server error'});
        }
    }

    private async create(request: Request, response: Response) {
        try {
            const authorizationHeader = request.headers.authorization;
            if (!authorizationHeader) {
                return response.status(401).send({message: 'Authorization header missing'});
            }
    
            const { id } = verify(authorizationHeader, JWT_SECRET) as JwtPayload;
            const {name, description, currentBid, finsih_date, img} = request.body;   
            
            if (!name || !description || !currentBid || !finsih_date || !img) {
                return response.status(400).send({message: 'Missing required fields'});
            }
    
            const newItem = {
                name,
                description,
                currentBid,
                finsih_date,
                created_by: id,
                img
            };

            const item = await db.Item.create(newItem);

            return response.status(201).send({message: 'New auction created!'});
        } catch (e) {
            error(e);   
            return response.status(500).send({message: 'Internal server error'});
        }
    
    }

    private async update(request: Request, response: Response) {
        try{

            const item_id = request.params.id;

            const { product_name, current_bid, description, starting_date, finish_date, created_by, img } = request.body;

            const item = await db.Item.findOne({where: {id: item_id}});

            if(!item){
                return response.status(404).send({message: 'Item not found'});
            }

            item.product_name = product_name;
            item.current_bid = current_bid;
            item.description = description;
            item.starting_date = starting_date;
            item.finish_date = finish_date;
            item.created_by = created_by;
            item.img = img;

            await item.save();

            return response.status(200).send({message: 'Item updated successfully'});


        }catch(e){
            error(e);
            return response.status(500).send({message: 'Internal server error'});
        }
    }

    private async delete(request: Request, response: Response) {
        try {
            const item_id = request.params.id;

            const item = await db.Item.findOne({where: {id: item_id}});

            if (!item) {
                return response.status(404).send({message: 'Item not found'});
            }

            await item.destroy();

            return response.status(200).send({message: 'Item deleted successfully'});

        } catch (e) {
            error(e);
            return response.status(500).send({message: 'Internal server error'});
        }
    }

    private async getOne(request: Request, response: Response) {
        try {
            const item_id = request.params.id;

            const item = await db.Item.findOne({where: {id: item_id}});

            if (!item) {
                return response.status(404).send({message: 'Item not found'});
            }

            return response.status(200).send(item);

        } catch (e) {
            error(e);
            return response.status(500).send({message: 'Internal server error'});
        }
    }

    private async createBid(request: Request, response: Response) {
        try {
            const authorizationHeader = request.headers.authorization;
            if (!authorizationHeader) {
                return response.status(401).send({message: 'Authorization header missing'});
            }
    
            const { id } = verify(authorizationHeader, JWT_SECRET) as JwtPayload;
            const {item_id, bid} = request.body;   
            
            if (!item_id || !bid) {
                return response.status(400).send({message: 'Missing required fields'});
            }
    
            const newBid = {
                item_id,
                bid,
                user_id: id
            };

            const item = await db.Item.findOne({where: {id: item_id}});

            if (!item) {
                return response.status(404).send({message: 'Item not found'});
            }

            if (bid <= item.currentBid) {
                return response.status(400).send({message: 'Bid must be higher than the current bid'});
            }

            item.currentBid = bid;
            await item.save();

            return response.status(201).send({message: 'New bid created!'});
        } catch (e) {
            error(e);   
            return response.status(500).send({message: 'Internal server error'});
        }
    
    }
}

export default ItemController