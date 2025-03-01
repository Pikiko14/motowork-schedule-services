import { FilterQuery, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Service } from '../schema/services.schema';
import { UpdateServiceDto } from '../dto/update-service.dto';
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
      const { page, perPage, search, from, to, filter } = paginationDto;

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
        const toDate = new Date(`${to}`);
        const fromDate = new Date(`${from}`);
        query.date = {
          $gte: fromDate,
          $lte: toDate,
        }
      }

      if (filter) {
        const filterObj = JSON.parse(filter)
        // valdiate status
        if (filterObj.status_service) {
          query.status = filterObj.status_service;
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

  async findOne(id: string): Promise<Service> {
    try {
      const serviceSchedule = await this.serviceModel.findById(id);
      return serviceSchedule;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async update(id: string, body: Service | UpdateServiceDto) {
    try {
      return await this.serviceModel.findByIdAndUpdate(id, body, { new: true });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
