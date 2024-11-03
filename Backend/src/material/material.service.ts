import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Asegúrate de que la ruta sea correcta
import { CreateMaterialDto } from './dto/create-material.dto'; // Importa el DTO correspondiente
import { UpdateMaterialDto } from './dto/update-material.dto'; // Importa el DTO correspondiente
import { Material } from '@prisma/client';

@Injectable()
export class MaterialService {
    constructor(private readonly prisma: PrismaService) {}

    async getAllMaterials(): Promise<Material[]> {
        return this.prisma.material.findMany(); // Obtiene todos los materiales
    }

    async getMaterialById(id: number): Promise<Material> {
        const material = await this.prisma.material.findUnique({
            where: { id },
        });

        if (!material) {
            throw new NotFoundException(`Material with ID ${id} not found`); 
        }

        return material;
    }

    async createMaterial(data: CreateMaterialDto): Promise<Material> {
        return this.prisma.material.create({
            data,
        });
    }

    async updateMaterial(id: number, data: UpdateMaterialDto): Promise<Material> {
        const materialExists = await this.prisma.material.findUnique({
            where: { id },
        });

        if (!materialExists) {
            throw new NotFoundException(`Material with ID ${id} not found`); 
        }

        return this.prisma.material.update({
            where: { id },
            data,
        });
    }

    async deleteMaterialById(id: number): Promise<Material> {
        const materialExists = await this.prisma.material.findUnique({
            where: { id },
        });

        if (!materialExists) {
            throw new NotFoundException(`Material with ID ${id} not found`); // Manejo de errores si el material no existe
        }

        return this.prisma.material.delete({
            where: { id },
        });
    }
}
