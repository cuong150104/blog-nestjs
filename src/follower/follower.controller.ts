import { Controller, Post, Delete, Param, SetMetadata, Get, Query } from '@nestjs/common';
import { FollowersService } from './follower.service';
import { Follower } from './entities/follower.entity';


@Controller('followers')
export class FollowersController {
    constructor(private readonly followersService: FollowersService) { }

    @SetMetadata('roles', ['User'])
    @Post(':followerId/:followedId')
    async followUser(
        @Param('followerId') followerId: number,
        @Param('followedId') followedId: number,
    ) {
        return this.followersService.followUser(followerId, followedId);
    }

    @SetMetadata('roles', ['User'])
    @Delete(':followerId/:followedId')
    async unfollowUser(
        @Param('followerId') followerId: string,
        @Param('followedId') followedId: string,
    ) {
        return this.followersService.unfollowUser(followerId, followedId);
    }

    @SetMetadata('roles', ['User'])
    @Get(':followerId/:followedId')
    async isFollowing(
        @Param('followerId') followerId: number,
        @Param('followedId') followedId: number,
    ): Promise<boolean> {
        return this.followersService.isFollowing(followerId, followedId);
    }

    @SetMetadata('roles', ['User'])
    @Get('all/:followerId')
    findAll(@Param('followerId') followerId: number,): Promise<Follower[]> {
        return this.followersService.findAll(followerId);
    }
}