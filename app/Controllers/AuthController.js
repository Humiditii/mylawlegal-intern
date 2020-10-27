import Utility from "../Utils/Utility";
import Utils from '../Utils/Utility';
import Auth from '../Models/Auth';


class AuthController{
  
    
    static async signup(req, res, next){

        const { firstname, lastname, email,role,street,state,localgovt, phone,  password } = req.body;

        console.log(req.body)

        const combinename = firstname+lastname

        try {
            const checkProfile = await Auth.findOne({email: email}) 
            if(checkProfile){
                return Utility.api_response(res, 400, 'Email already exist!!!')
            }else{

                try {

                    const checkName = await Auth.findOne({combinename: combinename})

                    if(checkName){
                        return Utility.api_response(res, 400, 'Name already exist!!!')

                    }else{

                        const newUser = Auth({
                            firstname: firstname,
                            lastname: lastname,
                            email: email,
                            role: role,
                            phone: phone,
                            address : {
                                street: street,
                                state: state,
                                localgvt: localgovt
                            },
                            password: Utility.hashPassword(password)
                        })
                        newUser.save().then( saved => {
                            const msg = `Account created for ${saved.email}`
                            return Utility.api_response(res, 201, msg)
                        }).catch(err => {
                            return Utility.appError(err, next)
                        })
                    }
                } catch (error) {
                    return Utility.appError(error, next)
                }
            }  
        } catch (error) {
            return Utility.appError(error, next)
        }

    }

    static async signin(req, res, next){
        const {email, password} = req.body;

        try {
            const findAccount = await Auth.findOne({email:email})
            if(!findAccount){
                return Utility.api_response(res, 404, `Account with ${email} does not exist`)
            }else{
                const dbPassword = findAccount.password;

                const comparePassword = Utility.decodePwd(password,dbPassword);

                if(comparePassword){
                    const user_data = {
                        email: findAccount.email,
                        id: findAccount._id,
                        role: findAccount.role
                    }
                    const token = Utils.generateToken(user_data)
            
                    const msg = `${findAccount.firstname} logged in`;

                    return Utils.api_response(res, 200, msg, token);
                }else{
                    return Utils.api_response(res, 401, 'Incorrect Password');
                }
            }
        } catch (error) {
            return Utility.appError(error, next)
        }
    }

    static async forgetPassword(req, res, next){

    }

    static async changePassword(req, res, next){

    }
    static async sendResetToken(req, res, next){

    }
}

export default AuthController