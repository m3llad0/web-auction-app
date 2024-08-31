import { Request, Response } from "express";
import AbstractController from "./abstractController";
import UserFactory from "../entities/userFactory";
import db from "../models";
import { sign } from "jsonwebtoken";
import bcrypt from "bcrypt";
import { JWT_SECRET } from "../config";
import { log, error } from "firebase-functions/logger";


class UserController extends AbstractController{

    protected validateBody(type: any) {
        throw new Error("Method not implemented.");
    }

    private static instance: UserController;

    public static getInstance(): UserController {
        if (!this.instance) {
            this.instance = new UserController('auth');
        }

        return this.instance
    }

    protected initRoutes(): void {
        this.router.post("/register", this.register);
        this.router.post("/login", this.login);
        
    }

    private async register(request: Request, response: Response) {
        try{

            const { name, lastname, email, pass, role } = request.body;
            
            if (!name || !lastname || !email || !pass || !role) {
                return response.status(400).send({message: 'Missing required fields'});
            }

            const findUser = await db.User.findOne({where: {email: email}});
            if(findUser){
                log(`User ${email} already exists`);
                return response.status(400).send({message: 'User already exists'});
                
            }

            const password = await bcrypt.hash(pass, 10);

            const newUser = UserFactory.createUser(role, {
                name,
                lastname,
                email,
                password,
                createdAt: new Date()
            });

            const user = await db.User.create(newUser);
            
            
            log(`User ${user.email} created`);
            return response.status(201).send({message: 'User created successfully'});

        }catch(e){
            error(e);
            return response.status(500).send({message: 'Internal server error'});
        }   
    }

    private async login(request: Request, response: Response) {
        try {
            const { email, password } = request.body;

            log(email, password);

            if (!email || !password) {
                return response.status(400).send({message: 'Missing required fields'});
            }

            const user = await db.User.findOne({where: {email: email}});
            if (!user) {
                return response.status(400).send({message: 'User not found'});
                
            }

            log(`User password${user.password}`);

            const isPasswordValid = await bcrypt.compare(password, user.password);
            // log(isPasswordValid);
            if (!isPasswordValid) {
                log(isPasswordValid);
                return response.status(400).send({message: 'Invalid password'});
                
            }

            const token = sign({id: user.id}, JWT_SECRET, {
                expiresIn: "24h"
            });

            log(`User ${user.email} logged in`);

            return response.status(200).send({token});
            
        } catch (e) {
            error(e)
            return response.status(500).send({message: 'Internal server error'});
            
        }
    }


}

export default UserController;