import { HttpStatus, Injectable, Module, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Like, Repository, UpdateResult } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { FilterPostDto } from './dto/filter-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Category } from 'src/category/entities/category.entity';

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Post) private postRepository: Repository<Post>
    ) { }
    async create(userI: number, createPostDto: CreatePostDto): Promise<Post> {
        const user = await this.userRepository.findOneBy({ id: userI });

        try {
            const res = await this.postRepository.save({
                ...createPostDto, user
            })
            console.log("check res +=>", res)
            return await this.postRepository.findOneBy({ id: res.id });
        } catch (error) {
            console.log('can not create post', HttpStatus.BAD_REQUEST);
        }
    }

    async findAll(query: FilterPostDto): Promise<any> {
        const items_per_page = Number(query.items_per_page) || 10;
        const page = Number(query.page) || 1;
        const skip = (page - 1) * items_per_page;
        const category = Number(query.category) || null;
        const keyword = query.search || '';
        const [res, total] = await this.postRepository.findAndCount({
            where: [
                {
                    title: Like('%' + keyword + '%'),
                    category: {
                        id: category
                    }
                },

                {
                    description: Like('%' + keyword + '%'),
                    category: {
                        id: category
                    }
                }

            ],
            order: { created_at: "DESC" },
            take: items_per_page,
            skip: skip,
            relations: {
                user: true,
                category: true,
            },
            select: {
                category: {
                    id: true,
                    name: true
                },
                user: {
                    id: true,
                    first_name: true,
                    last_name: true,
                    email: true,
                    avatar: true,
                }
            }
        })
        const lastPage = Math.ceil(total / items_per_page);
        const nextPage = page + 1 > lastPage ? null : page + 1;
        const prevPage = page - 1 < 1 ? null : page - 1;

        return {
            data: res,
            total,
            currentPage: page,
            nextPage,
            prevPage,
            lastPage
        }
    }

    async postByUser(id: number, query: FilterPostDto): Promise<any> {
        const items_per_page = Number(query.items_per_page) || 10;
        const page = Number(query.page) || 1;
        const skip = (page - 1) * items_per_page;
        const category = Number(query.category) || null;
        const keyword = query.search || '';
        const [res, total] = await this.postRepository.findAndCount({
            where: [
                { user: { id: id } }

            ],
            order: { created_at: "DESC" },
            take: items_per_page,
            skip: skip,
            relations: {
                user: true,
                category: true,
            },
            select: {
                category: {
                    id: true,
                    name: true
                },
                user: {
                    id: true,
                    first_name: true,
                    last_name: true,
                    email: true,
                    avatar: true,
                }
            }
        })
        const lastPage = Math.ceil(total / items_per_page);
        const nextPage = page + 1 > lastPage ? null : page + 1;
        const prevPage = page - 1 < 1 ? null : page - 1;

        return {
            data: res,
            total,
            currentPage: page,
            nextPage,
            prevPage,
            lastPage
        }
    }


    async findDetail(id: number): Promise<Post> {
        return await this.postRepository.findOne({
            where: { id },
            relations: ['user', 'category'],
            select: {
                category: {
                    id: true,
                    name: true
                },
                user: {
                    id: true,
                    first_name: true,
                    last_name: true,
                    email: true,
                    avatar: true
                }
            }
        })
    }



    async update(id: number, updatePostDto: UpdatePostDto): Promise<UpdateResult> {
        console.log(">check", updatePostDto);
        return await this.postRepository.update(id, updatePostDto);
    }

    async delete(id: number): Promise<DeleteResult> {
        return await this.postRepository.delete(id);
    }

    async findAll1(id: number, query: FilterPostDto): Promise<any> {
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

    async findOneVote(id: number): Promise<Post> {
        const post = await this.postRepository.findOne(
            {
                where: { id: id }
            }
        );
        if (!post) {
            throw new NotFoundException(`Post with ID ${id} not found`);
        }
        return post;
    }

    async voteUp(id: number): Promise<Post> {
        const post = await this.findOneVote(id);
        post.votes += 1;
        return this.postRepository.save(post);
    }

    async voteDown(id: number): Promise<Post> {
        const post = await this.findOneVote(id);
        post.votes -= 1;
        return this.postRepository.save(post);
    }

    async getVotes(id: number): Promise<number> {
        const post = await this.findOneVote(id);
        return post.votes;
    }
}
