import { IsInt, IsOptional,IsNumber, IsString } from 'class-validator';

export class CreateMaterialDto {
    @IsString()
    name: string;

    
    @IsNumber()
    quantity: number; 

    @IsInt()
    userId: number; 
}
