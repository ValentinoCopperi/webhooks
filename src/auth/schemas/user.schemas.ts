import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema({timestamps:true})
export class User {

    @Prop({type:String,required:true,minlength:5,maxlength:500})
    name : string;

    @Prop({
        type:String,
        required:true,
        unique:true,
        match : [/^\S+@\S+\.\S+$/, 'Must provide a valid email']
    })
    email : string;

    @Prop({type:String,required:true,minlength:5,maxlength:300})
    password:string;
}

export const UserSchema = SchemaFactory.createForClass(User);