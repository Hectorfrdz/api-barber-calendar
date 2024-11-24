import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    HttpStatus,
    Query,
    ParseIntPipe,
    HttpCode,
} from '@nestjs/common'
import { ApiResponseType } from 'src/shared/types/api-response.type'
import { CreateRoleDto } from './dto/create-role.dto'
import { UpdateRoleDto } from './dto/update-role.dto'
import { GetRoleDto } from './dto/get-role.dto'
import { RolesService } from './roles.service'
import { Role } from './entities/role.entity'

@Controller({
    path: 'api/v1/roles',
})
export class RolesController {
    constructor(private readonly rolesService: RolesService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    public async create(
        @Body() createRoleDto: CreateRoleDto,
    ): Promise<ApiResponseType<Role>> {
        return await this.rolesService.create({ createRoleDto })
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    public async findAll(
        @Query() query: GetRoleDto,
    ): Promise<ApiResponseType<Role[]>> {
        return await this.rolesService.findAll({ qs: query })
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    public async findOne(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<ApiResponseType<Role | null>> {
        return await this.rolesService.findOne({ by: { id } })
    }

    @Patch(':id')
    @HttpCode(HttpStatus.OK)
    public async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateRoleDto: UpdateRoleDto,
    ): Promise<ApiResponseType<Role | null>> {
        return await this.rolesService.update({ id, updateRoleDto })
    }

    @Delete(':id')
    public async remove(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<ApiResponseType<null>> {
        return await this.rolesService.remove({ id })
    }
}
