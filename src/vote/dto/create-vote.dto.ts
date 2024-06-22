import { Post } from "src/post/entities/post.entity";
import { User } from "src/user/entities/user.entity";

export class CreateVoteDto{
  
    value: number;

    user: User;

    post: Post;
}