import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';

import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { AuthUserDto } from '../dto/auth-user.dto';

@Injectable()
export class AuthService {

    constructor(private prisma: PrismaService, private jwtService: JwtService) { }

    async findEmail(email: string) {
        return this.prisma.user.findUnique({
            where: {
                email
            }
        })
    }

    async register(dto: CreateUserDto) {

        const userEmail = await this.findEmail(dto.email);

        if (userEmail) {
            throw new ConflictException('User already exists');
        }

        const hashpassword = await bcrypt.hash(dto.password, 10);

        const userCreated = await this.prisma.user.create({
            data: {
                email: dto.email,
                name: dto.name,
                password: hashpassword
            }
        })

        const { password: _, ...user } = userCreated;

        return user;
    }

    async login(dto: AuthUserDto) {

        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email
            }
        })

        if (!user) {
            throw new UnauthorizedException("Invalid credential")
        }

        const isPasswordValid = bcrypt.compareSync(dto.password, user.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException("Invalid credential")
        }

        const payload = { sub: user.id, email: user.email};

        return {
            user: user,
            access_token: this.jwtService.sign(payload)
        }

    }


}
