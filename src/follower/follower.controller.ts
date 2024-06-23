import { Controller, Post, Delete, Param, SetMetadata, Get, Query } from '@nestjs/common';
import { FollowersService } from './follower.service';
import { Follower } from './entities/follower.entity';
import { Public } from 'src/decorator/public.decorator';


@Controller('followers')
export class FollowersController {
    constructor(private readonly followersService: FollowersService) { }

    @SetMetadata('roles', ['User'])
    @Post(':followerId/:followedId')
    async followUser(
        @Param('followerId') followerId: number,
        @Param('followedId') followedId: number,
    ) {
        console.log("check ddddddddddddddddddd 1")
        return this.followersService.followUser(followerId, followedId);
    }

    @SetMetadata('roles', ['User'])
    @Delete(':followerId/:followedId')
    async unfollowUser(

        @Param('followerId') followerId: string,
        @Param('followedId') followedId: string,
    ) {
        console.log("check ddddddddddddddddddd 2")
        return this.followersService.unfollowUser(followerId, followedId);
    }

    @Public()
    @Get('all/:followerId')
    async findAll(@Param('followerId') followerId: string): Promise<number> {
        console.log("check ddddddddddddddddddd")
        return this.followersService.findAll(Number(followerId));
    }

    @Public()
    @Get(':followerId/:followedId')
    async isFollowing(
        @Param('followerId') followerId: number,
        @Param('followedId') followedId: number,
    ): Promise<boolean> {
        console.log("check ddddddddddddddddddd e")
        return this.followersService.isFollowing(followerId, followedId);
    }

 
}