import { ArrayNotEmpty, IsArray, IsString, MaxLength } from "class-validator";
import { Location } from "../entities/location.entity";

export class CreateLocationDto extends Location{
    @IsString()
    @MaxLength(35)
    locatioName:string
    @IsString()
    @MaxLength(120)
    locationAdress:string;
    @IsArray()
    @ArrayNotEmpty()
    locationLating:number[];

}
