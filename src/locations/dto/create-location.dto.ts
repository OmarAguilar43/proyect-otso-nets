import { ArrayNotEmpty, IsArray, IsObject, IsOptional, IsString, MaxLength } from "class-validator";
import { Location } from "../entities/location.entity";
import { Region } from "src/regions/entities/region.entity";

export class CreateLocationDto extends Location{
    @IsString()
    @MaxLength(35)
    locatioName:string
    @IsString()
    @MaxLength(120)
    locationAddress:string;
    @IsArray()
    @ArrayNotEmpty()
    locationLating:number[];
    @IsObject()
    @IsOptional()
    region: Region;

}
