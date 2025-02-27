import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServicesService } from './services.service';
import { CachingModule } from 'src/cache/cache.module';
import { ServicesController } from './services.controller';
import { Service, ServiceSchema } from './schema/services.schema';
import { ServicesScheduleRepository } from './repository/services.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Service.name, schema: ServiceSchema }]),
    CachingModule,
  ],
  controllers: [ServicesController],
  providers: [ServicesService, ServicesScheduleRepository],
})
export class ServicesModule {}
