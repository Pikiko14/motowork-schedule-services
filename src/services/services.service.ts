import { Service } from './entities/service.entity';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { PaginationDto } from 'src/commons/dto/paginator.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CacheService } from 'src/cache/services/cache.service.service';
import { MailQueueService } from 'src/queues/mail-queue/mail-queue.service';
import { ServicesScheduleRepository } from './repository/services.repository';

@Injectable()
export class ServicesService {
  constructor(
    private readonly repository: ServicesScheduleRepository,
    private readonly cacheService: CacheService,
    private readonly mailQueueService: MailQueueService
  ) {}
  
  async create(createServiceDto: CreateServiceDto) {
    try {
      const serviceSchedule = await this.repository.save(createServiceDto) as Service;

      // send email to confirmation
      await this.mailQueueService.sendMail(
        serviceSchedule?.client?.email,
        'Confirmación de servicio técnico',
        serviceSchedule,
      );

      // clear cache
      await this.cacheService.clearCache();

      return {
        success: true,
        data: serviceSchedule,
        message: 'Se ha agendado el servico correctamente.',
      };
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async findAll(pagination: PaginationDto) {
    try {
      // validate cache
      const cacheKey = `services:${JSON.stringify(pagination)}`;
      const cacheData = await this.cacheService.getCache(cacheKey);
      if (cacheData) {
        return {
          success: true,
          data: cacheData,
          message: 'Lista de servicios para el rango de fecha (desde cache)',
        };
      }

      // get services from bbdd
      const services = await this.repository.getServices(pagination);

      if (services.length > 0) {
        await this.cacheService.setCache(cacheKey, services);
      }

      return {
        success: true,
        data: services,
        message: 'Lista de servicios para el rango de fecha',
      };
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async findOne(id: string) {
    try {
      // validate cache
      const cacheKey = `services:${JSON.stringify(id)}`;
      const cacheData = await this.cacheService.getCache(cacheKey);
      if (cacheData) {
        return {
          success: true,
          data: cacheData,
          message: 'Información del servicio agendado (Desde cache)',
        };
      }

      // get services from bbdd
      const service = await this.repository.findOne(id);

      // set data in cache
      if (service) {
        await this.cacheService.setCache(cacheKey, service);
      }

      return {
        success: true,
        data: service,
        message: 'Información del servicio agendado',
      };
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
