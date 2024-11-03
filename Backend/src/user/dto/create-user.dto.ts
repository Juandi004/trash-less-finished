import { IsEmail, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
    @IsEmail()
    email: string;

    @IsInt()
    nui: number;

    @IsString()
    name: string; 
}
