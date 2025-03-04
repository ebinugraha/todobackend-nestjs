import { Module } from '@nestjs/common';
import { ControllerController } from './controller/controller.controller';
import { AuthService } from './service/service.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PrismaModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secret',
      signOptions: { expiresIn: '1d' }
    })
  ],
  controllers: [ControllerController],
  providers: [AuthService, JwtStrategy]
})
export class AuthModule { }
