import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ServicesService } from './services.service';
import { AuthGuard } from '../commons/guards/auth.guard';
import { HostGuard } from 'src/commons/guards/host.guard';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ScopesGuard } from 'src/commons/guards/scopes.guard';
import { PaginationDto } from 'src/commons/dto/paginator.dto';
import { Scopes } from 'src/commons/decorators/scope.decorator';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post()
  @Scopes('create-products')
  @UseGuards(HostGuard)
  create(@Body() createServiceDto: CreateServiceDto) {
    return this.servicesService.create(createServiceDto);
  }

  @Get()
  @Scopes('list-services')
  @UseGuards(AuthGuard, ScopesGuard)
  findAll(@Query() pagination: PaginationDto) {
    return this.servicesService.findAll(pagination);
  }

  @UseGuards(HostGuard)
  @Get(':id/validation')
  findOne(@Param('id') id: string) {
    return this.servicesService.findOneAndUpdate(id);
  }

  @UseGuards(HostGuard)
  @Put(':id')
  async update(@Body() updateServiceDto: UpdateServiceDto, @Param('id') id: string) {
    return await this.servicesService.update(id, updateServiceDto);
  }
}
