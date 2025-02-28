import { envs } from './config';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { MongooseModule } from '@nestjs/mongoose';
import { CachingModule } from './cache/cache.module';
import { ServicesModule } from './services/services.module';
import { MailQueueModule } from './queues/mail-queue/mail-queue.module';

@Module({
  imports: [
    ServicesModule,
    MongooseModule.forRoot(
      envs.app_env === 'develop' ? envs.databaseUrl : envs.atlas_url
    ),
    JwtModule.register({
      global: true,
      secret: envs.jwt_secret,
      signOptions: { expiresIn: '1d' },
    }),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    CachingModule,
    MailQueueModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
