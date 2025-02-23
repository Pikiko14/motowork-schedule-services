import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ServicesScheduleRepository } from './repository/services.repository';

@Injectable()
export class ServicesService extends ServicesScheduleRepository {
  async create(createServiceDto: CreateServiceDto) {
    try {
      const serviceSchedule = await this.save(createServiceDto);

      return {
        success: true,
        data: serviceSchedule,
        message: 'Se ha agendado el servico correctamente.'
      };
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async findAll() {
    try {
      const serviceSchedule = await this.save(1 as any);

      return {
        success: true,
        data: serviceSchedule
      };
    } catch (error) {
      throw new BadRequestException();
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} service`;
  }

  update(id: number, updateServiceDto: UpdateServiceDto) {
    return `This action updates a #${id} service`;
  }

  remove(id: number) {
    return `This action removes a #${id} service`;
  }
}
