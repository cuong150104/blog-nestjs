
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Follower {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    follower_id: number;//(id của người theo dõi)

    @Column()
    followed_id : number;// (id của người được theo dõi)
}