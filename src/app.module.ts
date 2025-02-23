import { envs } from './config';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServicesModule } from './services/services.module';

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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
