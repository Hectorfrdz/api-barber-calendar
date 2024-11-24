import {
    Controller,
    HttpStatus,
    Delete,
    Param,
    Patch,
    Post,
    Body,
    Get,
    Query,
    ParseIntPipe,
    HttpCode,
    UseGuards,
} from '@nestjs/common'
import { ApiResponseType } from '../../shared/types/api-response.type'
import { AuthJwtGuard } from 'src/core/guards/auth-jwt.guard'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { GetUsersDto } from './dto/get-user.dto'
import { UsersService } from './users.service'
import { User } from './entities/user.entity'

@Controller({
    path: 'api/v1/users',
})
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    @UseGuards(AuthJwtGuard)
    @HttpCode(HttpStatus.CREATED)
    public async create(
        @Body() createUserDto: CreateUserDto,
    ): Promise<ApiResponseType<User>> {
        return await this.usersService.create({ createUserDto })
    }

    @Get()
    @UseGuards(AuthJwtGuard)
    @HttpCode(HttpStatus.OK)
    public async findAll(
        @Query() query: GetUsersDto,
    ): Promise<ApiResponseType<User[]>> {
        return await this.usersService.findAll({ qs: query })
    }

    @Get(':id')
    @UseGuards(AuthJwtGuard)
    @HttpCode(HttpStatus.OK)
    public async findOne(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<ApiResponseType<User | null>> {
        return await this.usersService.findOne({ by: { id } })
    }

    @Patch(':id')
    @UseGuards(AuthJwtGuard)
    @HttpCode(HttpStatus.OK)
    public async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateUserDto: UpdateUserDto,
    ): Promise<ApiResponseType<any>> {
        return await this.usersService.update({ id, updateUserDto })
    }

    @Delete(':id')
    @UseGuards(AuthJwtGuard)
    @HttpCode(HttpStatus.OK)
    public async remove(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<ApiResponseType<null>> {
        return await this.usersService.remove({ id })
    }
}
