import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  HttpCode,
  Param,
  Body,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FindTopPageDto } from './dto/find-top-page.dto';
import { TopPageModel } from './top-page.model';

@Controller('top-page')
export class TopPageController {
  constructor(private readonly configService: ConfigService) {}

  @HttpCode(200)
  @Get(':id')
  async get(@Param('id') id: string) {
    this.configService.get('TEST');
  }

  @HttpCode(201)
  @Post()
  async create(
    @Body() dto: Omit<TopPageModel, '_id'>, // Все свойства модели, за исключением _id
  ) {}

  @HttpCode(201)
  @Put(':id')
  async update(@Body() dto: TopPageModel, @Param('id') id: string) {}

  @HttpCode(201)
  @Delete(':id')
  async delete(@Param('id') id: string) {}

  @HttpCode(200)
  @Post()
  async find(@Body() dto: FindTopPageDto) {}
}
