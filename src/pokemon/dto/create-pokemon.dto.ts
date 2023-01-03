import { IsInt, IsPositive, IsString, Min, MinLength } from 'class-validator';

export class CreatePokemonDto {

    // isint, ispositive, min 1
    @IsInt()
    @IsPositive()
    @Min(1)
    no: number;

    // isstring, minlenght 1
    @IsString()
    @MinLength(1)
    name: string;
}
