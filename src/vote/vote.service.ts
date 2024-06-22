import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vote } from './entities/vote.entity';
import { Post } from 'src/post/entities/post.entity';
import { User } from 'src/user/entities/user.entity';

import { CreateVoteDto } from './dto/create-vote.dto';
@Injectable()
export class VoteService {
    constructor(
        @InjectRepository(Vote)
        private votesRepository: Repository<Vote>,
        @InjectRepository(Post)
        private postsRepository: Repository<Post>,
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    async create(createVoteDto: CreateVoteDto): Promise<any> {
        // console.log("check vao vote CREATE roi 1", createVoteDto)
        // console.log("check vao vote CREATE roi 2", Number(createVoteDto.user))
        const post = await this.postsRepository.findOne({ where: { id: Number(createVoteDto.post) }, relations: ['votesList'] });
        const user = await this.usersRepository.findOne({ where: { id: Number(createVoteDto.user) }, relations: ['votesList'] });
        // console.log("check vao vote CREATE roi 3", post)
        // console.log("check vao vote CREATE roi 4", user)
        if (!post || !user) {
            throw new Error('Post or User not found');
        }

        const existingVote = await this.votesRepository.findOne({
            where: [
                { user: { id: user.id }, post: { id: post.id } },

            ],
        });
        const existingVote1 = await this.votesRepository.findAndCount();
        // console.log("check vao vote CREATE roi ====>", existingVote)
        // console.log("check vao vote CREATE roi 33", existingVote1)

        if (existingVote) {
            existingVote.value = createVoteDto.value;
            await this.votesRepository.save(existingVote);
            // console.log("check vao vote CREATE 1")
        } else {
            // console.log("check vao vote CREATE 2")
            const vote = new Vote();
            vote.post = post;
            vote.user = user;
            vote.value = createVoteDto.value;
            await this.votesRepository.save(vote);
        }
    }

    async getPostVotes(postId: number): Promise<number> {
        console.log("check vao vote roi")

        console.log("check vao vote roi  ++++", postId)
        const [votes, count] = await this.votesRepository.findAndCount({
            where: { post: { id: postId } },

        });
        console.log("check vao vote roi", votes)
        const voteSum = votes.reduce((sum, vote) => sum + vote.value, 0);
        console.log("check vao vote voteSum  === ", voteSum)
        return voteSum;
    }
}
