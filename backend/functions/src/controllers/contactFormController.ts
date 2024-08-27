import AbstractController from "./abstractController";
import { Request, Response } from "express";
import MailService from "../providers/emailService";
import { EMAIL_ADDRESSEE } from "../config";


class ContactFormController extends AbstractController{
    protected validateBody(type: any) {
        throw new Error("Method not implemented.");
    }

    private static instace: ContactFormController;

    public static getInstance(): ContactFormController {
        if(this.instace){
            return this.instace
        }

        this.instace = new ContactFormController("contact-form");
        return this.instace;
    }   

    protected initRoutes(): void {
        this.router.post("/sendForm", this.sendForm);
    }

    private async sendForm(req: Request, res: Response) {

        try{

            const {name, lastName, email, message} = req.body;

            if(!name || !lastName || !email || !message){
                return res.status(400).send({message: "Valores faltantes"});
            }

            const mailService = MailService.getInstance();

            mailService.sendMail({
                to: EMAIL_ADDRESSEE,
                subject: "Nuevo mensaje de contacto",
                html: `
                    <h1>${name} ${lastName}</h1>
                    <h2>Email: ${email}</h2>
                    <p>Mensaje: ${message}</p>`
            });

            return res.status(200).send({'message': 'ok'});
        
        }catch(error){

            return res.status(500).send({message: error})
        }
    }
}

export default ContactFormController;