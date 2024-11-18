import { UsersController } from './users.controller'
import { RolesModule } from '../roles/roles.module'
import { User } from '../../entities/user.entity'
import { Role } from '../../entities/role.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersService } from './users.service'
import { Module } from '@nestjs/common'

@Module({
    imports: [TypeOrmModule.forFeature([User, Role]), RolesModule],
    controllers: [UsersController],
    providers: [UsersService],
})
export class UsersModule {}
