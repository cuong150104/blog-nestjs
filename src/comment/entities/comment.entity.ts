import { Column, CreateDateColumn, UpdateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, OneToOne } from "typeorm";
import { Post } from 'src/post/entities/post.entity';
import { User } from "src/user/entities/user.entity";

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    postId: number;

    @Column()
    author: string;

    @Column()
    content: string;

    @CreateDateColumn()
    created_at: Date;

    @ManyToOne(() => Post, post => post.comments)
    post: Post;

    @ManyToOne(() => User, user => user.comments)
    user: User;

}