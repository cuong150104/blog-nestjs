import { Comment } from 'src/comment/entities/comment.entity';
import { Module } from '@nestjs/common';

import { PostService } from './post.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Post } from './entities/post.entity';
import { PostController } from './post.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post, User, Comment]), // Import tất cả entity cần thiết một lần
    ConfigModule
  ],
  controllers: [PostController],
  providers: [PostService]
})
export class PostModule { }
