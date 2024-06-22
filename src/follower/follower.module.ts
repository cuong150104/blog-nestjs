// followers.module.ts
import { Module } from '@nestjs/common';
import { FollowersController } from './follower.controller';
import { FollowersService } from './follower.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { User } from 'src/user/entities/user.entity';
import { Follower } from './entities/follower.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([Follower, User]),
    ConfigModule
  ],
  controllers: [FollowersController],
  providers: [FollowersService],
})
export class FollowersModule { }