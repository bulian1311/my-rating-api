import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  HttpCode,
  Body,
	Param,
} from '@nestjs/common';
import { FindProductDto } from './dto/find-product.dto';
import { ProductModel } from './product.model';

@Controller('product')
export class ProductController {
  @HttpCode(200)
  @Get(':id')
  async get(
    @Param('id') id: string
  ) {}

  @HttpCode(201)
  @Post()
  async create(
		@Body() dto: Omit<ProductModel, '_id'>, // Все свойства модели, за исключением _id
	) {}

	@HttpCode(201)
  @Put(':id')
  async update(
		@Body() dto: ProductModel,
		@Param('id') id: string
	) {}

	@HttpCode(201)
  @Delete(':id')
  async delete(
		@Param('id') id: string
	) {}

	@HttpCode(200)
	@Post()
	async find(
		@Body() dto: FindProductDto
	) {}
}
