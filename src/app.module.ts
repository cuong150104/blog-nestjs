import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/data-source';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PostModule } from './post/post.module';
import { CategoryModule } from './category/category.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/roles.guard';
import { AuthGuard } from './auth/auth.guard';
import { User } from './user/entities/user.entity';
import { FollowersModule } from './follower/follower.module';
import { CommentModule } from './comment/comment.module';
import { VoteModule } from './vote/vote.module';

@Module({

  imports: [TypeOrmModule.forRoot(dataSourceOptions),
    UserModule,
    AuthModule,
  ConfigModule.forRoot(),
    PostModule,
    CategoryModule,
    TypeOrmModule.forFeature([User]),
    FollowersModule,
    CommentModule,
    VoteModule,
  
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    }
  ],
})
export class AppModule {
  // constructor(private dataSoure: DataSource){}
}
