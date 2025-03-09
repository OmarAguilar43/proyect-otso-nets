import { IsEmail, IsInt, IsNumber, IsOptional, IsString, IsUUID, MaxLength } from "class-validator";

export class CreateEmployeeDto {
    
    @IsString()
    @MaxLength(30)
    employeeName:string;
    @IsString()
    @MaxLength(10)
    employeeLastName:string;
    @IsString()
    @MaxLength(10)
    employeePhoneNumber:string;
    @IsString()
    @IsEmail()
    employeeEmail:string;
}
