import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { UserInt } from './../types/User';
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./schemas/user.schemas";
import { Model } from "mongoose";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthSerive {

    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        private jwtService: JwtService
    ) { }

    async createUser(user: UserInt): Promise<UserInt | string>  {

        if(!user.email || !user.name || !user.password) return "Must completed every field";

        const validUser = await this.userModel.findOne({email : user.email});

        if(validUser) return "User already exists";

        const hashedPasword = await bcrypt.hash(user.password,10);

        const newUser = new this.userModel({
            ...user,
            password : hashedPasword
        });

        return newUser.save();
    }

    async validateUser(email: string, password: string): Promise<Object | null> {

        const user = await this.userModel.findOne({ email });

        if (!user) return null;

        const isPasswordValid = await bcrypt.compare(password,user.password);

        if(!isPasswordValid) return null;

        return {
            _id: user._id,
            email: user.email,
            name: user.name
        };

    }

    async login(user: UserInt): Promise<Object> {


        const payload = {
            name: user.name,
            _id: user._id
        }


        return {
            access_token: this.jwtService.sign(payload)
        };
    }
}