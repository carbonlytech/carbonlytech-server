import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Role } from "../enums/role.enum";
import { Document } from "mongoose";


@Schema({
    timestamps: true
})

export class User extends Document{
    @Prop()
    businessName: string

    @Prop({unique: [true,"Duplicate email entered"]})
    email: string

    @Prop()
    password:string

    @Prop({
        type: [{type: String, enum: Role}],
        default: [Role.User],
    })
    role: Role[];
}

export const UserSchema=SchemaFactory.createForClass(User);