import { Controller, Get, Post, Put, Delete, Body, Param, NotFoundException, HttpStatus } from "@nestjs/common";
import { UserService } from "./user.service";
import { UpdateUserDto } from "./dto/update-user.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "@prisma/client";

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    async getAllUsers() {
        const users = await this.userService.getAllUsers();
        return {
            status: "success",
            statusCode: HttpStatus.OK,
            data: users
        };
    }

    @Get(':id')
    async getUserById(@Param('id') id: string) {
        const user = await this.userService.getUserById(Number(id));
        if (!user) {
            throw new NotFoundException({
                status: "fail",
                statusCode: HttpStatus.NOT_FOUND,
                message: `User with ID ${id} not found`
            });
        }
        return {
            status: "success",
            statusCode: HttpStatus.OK,
            data: user
        };
    }

    @Post()
    async createUser(@Body() data: CreateUserDto) {
        const newUser = await this.userService.createUser(data);
        return {
            status: "success",
            statusCode: HttpStatus.CREATED,
            data: newUser,
            message: "User created successfully"
        };
    }

    @Put(':id')
    async editUser(@Param('id') id: string, @Body() data: UpdateUserDto) {
        const updatedUser = await this.userService.updateUser(Number(id), data);
        if (!updatedUser) {
            throw new NotFoundException({
                status: "fail",
                statusCode: HttpStatus.NOT_FOUND,
                message: `User with ID ${id} not found`
            });
        }
        return {
            status: "success",
            statusCode: HttpStatus.OK,
            data: updatedUser,
            message: "User updated successfully"
        };
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: string) {
        try {
            await this.userService.deleteUserById(Number(id));
            return {
                status: "success",
                statusCode: HttpStatus.OK,
                message: "User deleted successfully"
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
