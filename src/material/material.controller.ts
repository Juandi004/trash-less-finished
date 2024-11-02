import { Controller, Get, Post, Put, Delete, Body, Param, NotFoundException, HttpStatus } from '@nestjs/common';
import { MaterialService } from './material.service';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
import { Material } from '@prisma/client';

@Controller('materials')
export class MaterialController {
    constructor(private readonly materialService: MaterialService) {}

    @Get()
    async getAllMaterials() {
        const materials = await this.materialService.getAllMaterials();
        return {
            status: "success",
            statusCode: HttpStatus.OK,
            data: materials
        };
    }

    @Get(':id')
    async getMaterialById(@Param('id') id: number) {
        const material = await this.materialService.getMaterialById(Number(id));
        if (!material) {
            throw new NotFoundException({
                status: "fail",
                statusCode: HttpStatus.NOT_FOUND,
                message: `Material with ID ${id} not found`
            });
        }
        return {
            status: "success",
            statusCode: HttpStatus.OK,
            data: material
        };
    }

    @Post()
    async createMaterial(@Body() data: CreateMaterialDto) {
        const newMaterial = await this.materialService.createMaterial(data);
        return {
            status: "success",
            statusCode: HttpStatus.CREATED,
            data: newMaterial,
            message: "Material created successfully"
        };
    }

    @Put(':id')
    async updateMaterial(@Param('id') id: string, @Body() data: UpdateMaterialDto) {
        const updatedMaterial = await this.materialService.updateMaterial(Number(id), data);
        if (!updatedMaterial) {
            throw new NotFoundException({
                status: "fail",
                statusCode: HttpStatus.NOT_FOUND,
                message: `Material with ID ${id} not found`
            });
        }
        return {
            status: "success",
            statusCode: HttpStatus.OK,
            data: updatedMaterial,
            message: "Material updated successfully"
        };
    }

    @Delete(':id')
    async deleteMaterial(@Param('id') id: string) {
        try {
            await this.materialService.deleteMaterialById(Number(id));
            return {
                status: "success",
                statusCode: HttpStatus.OK,
                message: "Material deleted successfully"
            };
        } catch (error) {
            throw new NotFoundException({
                status: "fail",
                statusCode: HttpStatus.NOT_FOUND,
                message: error.message
            });
        }
    }
}
