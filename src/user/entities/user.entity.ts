import { Post } from 'src/post/entities/post.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from 'typeorm';
import { Comment } from 'src/comment/entities/comment.entity';
import { Vote } from 'src/vote/entities/vote.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    first_name: string;

    @Column()
    last_name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({ nullable: true, default: null })
    refresh_token: string;

    @Column({ nullable: true, default: null })
    avatar: string;

    @Column({ default: 1 })
    status: number;

    @Column({ default: 'User' })
    roles: string;

    @CreateDateColumn()
    create_at: Date;

    @CreateDateColumn()
    update_at: Date;

    @OneToMany(() => Post, (post) => post.user)
    posts: Post[]

    @OneToMany(() => Comment, (comment) => comment.user)
    comments: Comment[]

    @OneToMany(() => Vote, (vote) => vote.user)
    votesList: Vote[]
}