
import { User } from "src/user/entities/user.entity";

export class CreateCommentDto {

    postId: number;

    author: string;

    content: string;

    user: User;
}