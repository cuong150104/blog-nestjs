import { Category } from './../../category/entities/category.entity';
import { User } from "src/user/entities/user.entity"; // Verify this path
import { Column, CreateDateColumn, UpdateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    summary: string;

    @Column({type:'longtext'})
    description: string;

    @Column()
    thumbnail: string;

    @Column({ type: "int", default: 1 })
    status: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn() // Use UpdateDateColumn for auto-updating the timestamp
    updated_at: Date;

    @ManyToOne(() => User, user => user.posts)
    user: User;

    @ManyToOne(() => Category, (category) => category.posts)
    category: Category
}
