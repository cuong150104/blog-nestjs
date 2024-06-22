import { Controller, Get, Post, Body, Param, SetMetadata, Req, BadRequestException, Query } from '@nestjs/common';
import { CommentService } from './comment.service';
import { Comment } from './entities/comment.entity';
import { CreateCommentDto } from './dto/create-comment';
import { Public } from '../decorator/public.decorator';
@Controller('comments') // Định nghĩa route gốc cho controller này là 'comments'
export class CommentController {
  constructor(private readonly commentsService: CommentService) { } // Inject CommentService

  @SetMetadata('roles', ['User'])
  @Post()
  create(@Req() req: any, @Body() createCommentDto: CreateCommentDto): Promise<Comment> {
    console.log("chec =======>",req['user_data']);
    console.log("chec =======>",createCommentDto);
    if (req.fileValidationError) {
      throw new BadRequestException(req.fileValidationError);
    }
    return this.commentsService.create(req['user_data'].id, createCommentDto);
  }

  // Endpoint GET /comments/:postId để lấy tất cả comment của một bài viết dựa trên postId
  @SetMetadata('roles', ['Admin', 'User'])
  @Get(':postId')
  async findAll(@Param('postId') postId: string) {
    return this.commentsService.findAll(Number(postId)); // Gọi phương thức findAll của CommentService và chuyển postId thành kiểu số
  }

  @Public() 
  @Get('comments-by-user/:idPost')
  commentsByUser(@Param('idPost') id: string, @Query() query: CreateCommentDto): Promise<any> {
      return this.commentsService.commentsByUser(Number(id),query);
  }

}
