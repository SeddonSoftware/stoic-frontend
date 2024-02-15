import LoginModel from "../models/Login/loginModel";
import LoginResultModel from "../models/Login/loginResultModel";
import http from './httpService';

class AuthService {
    public async login(authInput: LoginModel): Promise<LoginResultModel> {
        let result = await http.post('login', authInput);
        return result.data;
    }
}
const authService = new AuthService();

export default authService;