import { UpdateUserDto } from './dto/update-user.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { DeleteResult, In, Like, Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { FilterUserDto } from './dto/filter-user.dto';
import { Post } from 'src/post/entities/post.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Post) private postRepository: Repository<Post>
    ) { }
    async findAll(query: FilterUserDto): Promise<any> {
        const items_per_page = Number(query.items_per_page) || 10;
        const page = Number(query.page) || 1;
        const skip = (page - 1) * items_per_page;

        const keyword = query.search || '';
        const [res, total] = await this.userRepository.findAndCount({
            where: [
                { first_name: Like('%' + keyword + '%') },
                { last_name: Like('%' + keyword + '%') },
                { email: Like('%' + keyword + '%') }
            ],
            order: { create_at: "DESC" },
            take: items_per_page,
            skip: skip,
            select: ['id', 'first_name', 'last_name', 'email', 'status', 'create_at', 'update_at']
        })
        const lastPage = Math.ceil(total / items_per_page);
        const nextPage = page + 1 > lastPage ? null : page + 1;
        const prevPage = page - 1 < 1 ? null : page - 1;

        return {
            data: res,
            total,
            currenPage: page,
            nextPage,
            prevPage,
            lastPage
        }
    }


    async findAll1(id: number, query: FilterUserDto): Promise<any> {
        const items_per_page = Number(query.items_per_page) || 10;
        const page = Number(query.page) || 1;
        const skip = (page - 1) * items_per_page;

        const keyword = query.search || '';
        const [res, total] = await this.userRepository.findAndCount({
            where: [
                { id: id }
            ],
            order: { create_at: "DESC" },
            take: items_per_page,
            skip: skip,
            select: ['id', 'first_name', 'last_name', 'email', 'status', 'create_at', 'update_at']
        })
        const lastPage = Math.ceil(total / items_per_page);
        const nextPage = page + 1 > lastPage ? null : page + 1;
        const prevPage = page - 1 < 1 ? null : page - 1;

        return {
            data: res,
            total,
            currenPage: page,
            nextPage,
            prevPage,
            lastPage
        }
    }


    async postByUser(id: number): Promise<Post[]> {
        return await this.postRepository.find({ where: { id } });
    }



    async findOne(id: number): Promise<User> {
        return await this.userRepository.findOneBy({ id });
    }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const hashPassword = await bcrypt.hash(createUserDto.password, 10);

        return await this.userRepository.save({ ...createUserDto, password: hashPassword });
    }

    async update(id: number, updateUserDto: UpdateUserDto): Promise<UpdateResult> {
        return await this.userRepository.update(id, updateUserDto);
    }

    async delete(id: number): Promise<DeleteResult> {
        return await this.userRepository.delete(id);
    }

    async updateAvatar(id: number, avatar: string): Promise<UpdateResult> {
        return await this.userRepository.update(id, { avatar });
    }

    async multipleDelete(ids: string[]): Promise<DeleteResult> {
        return await this.userRepository.delete({ id: In(ids) })
    }
}
