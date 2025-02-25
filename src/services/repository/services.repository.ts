import { FilterQuery, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Service } from '../schema/services.schema';
import { InternalServerErrorException } from '@nestjs/common';
import { PaginationDto } from 'src/commons/dto/paginator.dto';
import { CreateServiceDto } from './../dto/create-service.dto';

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

  async getServices(paginationDto: PaginationDto): Promise<Service[]> {
    try {
      const { page, perPage, search, from, to } = paginationDto;

      const pageNumber = page;
      const itemsPerPage = perPage;

      // Construir el filtro de búsqueda
      let query: FilterQuery<Service> = {};

      if (search && search.trim() !== '') {
        const searchRegex = new RegExp(search as string, "i");
        query = {
          $or: [
            { "client.dni": searchRegex },
            { "client.email": searchRegex },
            { "client.lastName": searchRegex },
            { "client.name": searchRegex },
            { "client.phone": searchRegex },
            {
              $expr: {
                $regexMatch: {
                  input: {
                    $concat: ["$client.name", " ", "$client.lastName"],
                  },
                  regex: search,
                  options: "i",
                },
              },
            },
          ],
        };
      }
      
      if (from || to) {
        query.date = {
          $gte: new Date(from),
          $lte: new Date(to),
        }
      }

      const services = await this.serviceModel
        .find(query)
        .skip((pageNumber - 1) * itemsPerPage)
        .limit(itemsPerPage)
        .sort({ dateField: -1 });

      return services;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
