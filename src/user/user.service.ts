import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; 
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {}

    async getAllUsers(): Promise<User[]> {
        return this.prisma.user.findMany(); 
    }

    async getUserById(id: number): Promise<User> {
        const user = await this.prisma.user.findUnique({
            where: { id },
        });

        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }

        return user;
    }

    async createUser(data: CreateUserDto): Promise<User> {
        return this.prisma.user.create({
            data,
        });
    }

    async updateUser(id: number, data: UpdateUserDto): Promise<User> {
        const userExists = await this.prisma.user.findUnique({
            where: { id },
        });

        if (!userExists) {
            throw new NotFoundException(`User with ID ${id} not found`); 
        }

        return this.prisma.user.update({
            where: { id },
            data,
        });
    }

    async deleteUserById(id: number): Promise<User> {
        const userExists = await this.prisma.user.findUnique({
            where: { id },
        });

        if (!userExists) {
            throw new NotFoundException(`User with ID ${id} not found`); 
        }

        return this.prisma.user.delete({
            where: { id },
        });
    }
}
