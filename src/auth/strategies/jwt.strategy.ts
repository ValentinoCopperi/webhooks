import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportSerializer, PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserInt } from 'src/types/User';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    
    constructor(){
        super({
            jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration : false,
            secretOrKey : 'SECRET_TEST_KEY'
        })
    }

    validate(payload : UserInt) {
        if(!payload){
            throw new UnauthorizedException();
        }
        return {_id : payload._id , username : payload.name}
    }
        
    
}