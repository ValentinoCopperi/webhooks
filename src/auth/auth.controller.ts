import { Body, Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { AuthSerive } from "./auth.service";
import { UserInt } from "src/types/User";
import { LocalAuthGuard } from "../guard/local-auth.guard";
import { JwtAuthGuard } from "../guard/jwt-auth.guard";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthSerive) {}

    @Post("register")
    createNew (@Body () user : UserInt){
        return this.authService.createUser(user);
    }
    
    
    @UseGuards(LocalAuthGuard)
    @Post("login")
    async login(@Request() req){
        return this.authService.login(req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get("profile")
    getProfile(@Request() req){
       return req.user;
    }
    
    @UseGuards(JwtAuthGuard)
    @Get("check")
    check(@Request() req){
        return "Checked";
    }

}