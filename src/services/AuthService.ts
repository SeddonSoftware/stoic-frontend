import LoginModel from "../models/Login/loginModel";
import http from './httpService';

class AuthService{
    public async login(authInput: LoginModel):Promise<any>{
        let result = await http.post('login', authInput)
        console.log(result);
        return result;
    }
}

export default new AuthService();