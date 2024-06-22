import { Module} from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Comment } from './entities/comment.entity'
import { Post } from 'src/post/entities/post.entity';
import { User } from 'src/user/entities/user.entity';
@Module({
  imports:[
    TypeOrmModule.forFeature([Comment,Post, User]),
    ConfigModule
  ],
  controllers: [CommentController],
  providers: [CommentService]
})
export class CommentModule {}
