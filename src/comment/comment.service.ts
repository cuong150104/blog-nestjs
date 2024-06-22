import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { User } from 'src/user/entities/user.entity';
import { CreateCommentDto } from './dto/create-comment';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment) private commentRepository: Repository<Comment>,
    @InjectRepository(User) private userRepository: Repository<User>
  ) { }

  // Phương thức tạo mới một comment
  async create(id: number, createCommentDto: CreateCommentDto): Promise<Comment> {
    const user = await this.userRepository.findOneBy({ id: id });
    console.log("check user +=>", user)
    try {
      const res = await this.commentRepository.save({
        ...createCommentDto, user
      })
      console.log("check res +=>", res)
      return await this.commentRepository.findOneBy({ id: res.id });
    } catch (error) {
      console.log('can not create post', error);
    }
  }

  // Phương thức lấy tất cả comment cho một bài viết (postId)
  async findAll(postId: number): Promise<Comment[]> {
    return this.commentRepository.find({ where: { postId } }); // Tìm các comment dựa trên postId
  }

  async commentsByUser(idPost: number, query: CreateCommentDto): Promise<any> {

    const [res, total] = await this.commentRepository.findAndCount({
      where:
        { postId: idPost }
      ,
      order: { created_at: "DESC" },
      relations: {
        user: true,
      },
      select: {
        user: {
          id: true,
          first_name: true,
          last_name: true,
          email: true,
          avatar: true,
        }
      }
    })
    console.log("check res", res);

    return {
      data: res,
      total,
    }
  }

}
