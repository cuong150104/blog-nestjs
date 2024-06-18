import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from './auth.service';
@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: '12345',
      signOptions: { expiresIn: 10 }  // đảm bảo rằng thư viện của bạn hỗ trợ định dạng này
    }),
    ConfigModule

  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule { }
