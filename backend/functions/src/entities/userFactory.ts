import User, {UserAttributes} from "./user";


export default class UserFactory{
    static createUser(type: "admin" | "regular", attributes: Omit<UserAttributes, "role">):User{
        switch(type) {
            case "admin":
                return new User({...attributes, role: "admin"});
            
            case "regular":
                return new User({...attributes, role: "regular"})
            default:
                throw new Error(`Invalid user type ${type}`)
        }
        
    }
}