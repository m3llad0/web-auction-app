import bcrypt from "bcrypt";
 
export interface UserAttributes {
    name: string;
    lastname: string;
    email: string;
    password: string;
    role: string;
    createdAt: Date;
}

export default class User implements UserAttributes {
    name: string;
    lastname: string;
    email: string;
    password: string;
    role: string;
    createdAt: Date;

    constructor(attributes: UserAttributes) {
        this.name = attributes.name;
        this.lastname = attributes.lastname;
        this.email = attributes.email;
        this.role = attributes.role;
        this.createdAt = attributes.createdAt;
        this.password = attributes.password;}
    
    public getUserData(): Omit<UserAttributes, 'password'> {
        return {
            name: this.name,
            lastname: this.lastname,
            email: this.email,
            role: this.role,
            createdAt: this.createdAt,
        };
    }
}
