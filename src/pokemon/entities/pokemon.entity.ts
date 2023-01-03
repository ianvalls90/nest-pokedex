import { Schema, SchemaFactory, Prop } from "@nestjs/mongoose/dist";
import { Document } from "mongoose";

@Schema()
export class Pokemon extends Document {

    // id: string // me lo da mongo
    @Prop({
        unique: true,
        index: true,
    })
    name: string;

    @Prop({
        unique: true,
        index: true,
    })
    no: number;

}


export const PokemonSchema = SchemaFactory.createForClass( Pokemon );