import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthSerive } from './../auth.service';


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

    constructor(private authService : AuthSerive ) {
        super({usernameField:"email"});
    }

    validate(email : string , password : string) : any{
       
        const user =  this.authService.validateUser(email,password);
        if(!user){
            throw new UnauthorizedException();
        }

        return user;
    }
}