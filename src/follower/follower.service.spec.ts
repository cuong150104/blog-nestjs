import { Test, TestingModule } from '@nestjs/testing';
import { FollowersService } from './follower.service';

describe('FollowerService', () => {
  let service: FollowersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FollowersService],
    }).compile();

    service = module.get<FollowersService>(FollowersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
