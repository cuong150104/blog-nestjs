
import { Controller, Post, Body, Get, Param, SetMetadata } from '@nestjs/common';
import { VoteService } from './vote.service';
import { CreateVoteDto } from './dto/create-vote.dto';
import { Public } from 'src/decorator/public.decorator';


@Controller('votes')
export class VoteController {
  constructor(private readonly voteService: VoteService) { }

  @SetMetadata('roles', ['Admin', 'User'])
  @Post()
  async vote( @Body() createVoteDto: CreateVoteDto ) {
    await this.voteService.create( createVoteDto);
  }

  @Public()
  @Get(':postId')
  async getPostVotes(@Param('postId') postId: string) {
    console.log("check ==>");
   return await this.voteService.getPostVotes(Number(postId));
  }
}

