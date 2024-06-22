import { Post } from 'src/post/entities/post.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class Vote {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.votesList)
    user: User;

    @ManyToOne(() => Post, post => post.votesList)
    post: Post;

    @Column()
    value: number; // 1 for upvote, -1 for downvote
}
