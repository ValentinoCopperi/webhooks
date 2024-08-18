import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthSerive } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { MongooseError } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schemas';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';
import { JwtStrategy } from './strategies/jwt.strategy';
@Module({
    imports : [
        MongooseModule.forFeature([{name : User.name , schema : UserSchema}]),
        PassportModule,
        JwtModule.register({
            secret : 'SECRET_TEST_KEY',
            signOptions : {
                expiresIn : "1000s"
            }
        })
    ],
    providers : [AuthSerive,LocalStrategy,JwtStrategy],
    exports : [AuthSerive]
})
export class AuthModule {}
