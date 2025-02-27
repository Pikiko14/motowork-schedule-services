import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, Logger } from '@nestjs/common';

@Injectable()
export class CacheService {
  logger = new Logger();

  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async setCache(key: string, data: any, ttl = 300000): Promise<void> {
    await this.cacheManager.set(key, JSON.stringify(data), ttl);
    this.logger.log(`Guardado en cache la llave ${key}!`);
  }

  async getCache(key: string): Promise<any> {
    const data = await this.cacheManager.get<any>(key);
    return data ? JSON.parse(data) : null;
  }

  async deleteCache(key: string): Promise<void> {
    await this.cacheManager.del(key);
    this.logger.log(`Eliminado de cache el ${key}!`);
  }

  async clearCache(): Promise<void> {
    await this.cacheManager.clear();
    this.logger.log('Se ha limpado todo el cache');
  }
}
