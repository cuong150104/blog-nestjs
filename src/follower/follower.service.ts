// followers.service.ts
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Follower } from './entities/follower.entity';


@Injectable()
export class FollowersService {
  constructor(
    @InjectRepository(Follower)
    private followersRepository: Repository<Follower>,
  ) { }

  async followUser(followerId: number, followedId: number): Promise<Follower> {
    // Kiểm tra xem followerId và followedId đã tồn tại chưa
    const existingFollow = await this.followersRepository.findOne({
      where: { follower_id: followerId, followed_id: followedId },
    });

    if (existingFollow) {
      throw new ConflictException('Follow relationship already exists');
    }

    // Tạo mối quan hệ theo dõi mới
    const newFollower = this.followersRepository.create({
      follower_id: followerId,
      followed_id: followedId,
    });
    await this.followersRepository.save(newFollower);
    return newFollower;
  }

  async unfollowUser(followerId: string, followedId: string) {
    // Xóa mối quan hệ theo dõi
    const result = await this.followersRepository
      .createQueryBuilder()
      .delete()
      .where('follower_id = :followerId AND followed_id = :followedId', { followerId, followedId })
      .execute();
    return result;
  }

  async isFollowing(followerId: number, followedId: number): Promise<boolean> {
    const existingFollow = await this.followersRepository.findOne({
      where: { follower_id: followerId, followed_id: followedId },
    });

    return !!existingFollow; // Trả về true nếu tồn tại, ngược lại trả về false
  }

  async findAll(followerId: number): Promise<Follower[]> {
    return await this.followersRepository.find({
      where: { id: followerId }
    });
  }
}