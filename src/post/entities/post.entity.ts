import { Category } from './../../category/entities/category.entity';
import { User } from "src/user/entities/user.entity"; // Verify this path
import { Column, CreateDateColumn, UpdateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Comment } from "src/comment/entities/comment.entity";
import { Vote } from 'src/vote/entities/vote.entity';


@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    summary: string;

    @Column({ type: 'longtext' })
    description: string;

    @Column()
    thumbnail: string;

    @Column({ type: "int", default: 1 })
    status: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn() // Use UpdateDateColumn for auto-updating the timestamp
    updated_at: Date;


    @Column({ default: 0 })
    votes: number;

    @ManyToOne(() => User, user => user.posts)
    user: User;

    @ManyToOne(() => Category, (category) => category.posts)
    category: Category

    @OneToMany(() => Comment, (comment) => comment.post)
    comments: Comment[]


    @OneToMany(() => Vote, vote => vote.post)
    votesList: Vote[];

}