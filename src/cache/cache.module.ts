import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { CacheService } from './services/cache.service.service';

@Module({
  imports: [CacheModule.register()],
  providers: [CacheService],
  exports: [CacheService, CacheModule],
})
export class CachingModule {}
