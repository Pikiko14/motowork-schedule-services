import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Service } from '../schema/services.schema';
import { CreateServiceDto } from './../dto/create-service.dto';
import { InternalServerErrorException } from '@nestjs/common';

export class ServicesScheduleRepository {
  constructor(
    @InjectModel(Service.name) private readonly serviceModel: Model<Service>,
  ) {}

  async save(body: CreateServiceDto): Promise<Service> {
    try {
        const serviceSchedule = await this.serviceModel.create(body);
        return serviceSchedule;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
