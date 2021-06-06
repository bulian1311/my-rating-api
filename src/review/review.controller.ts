import { Controller, Get, Post, Delete, Param, Body, HttpCode } from '@nestjs/common';
import { ReviewModel } from './review.model';


@Controller('review')
export class ReviewController {
	@HttpCode(200)
	@Get('byProduct/:productId')
	async getByProduct(
		@Param('productId') productId: string
	){}

	@HttpCode(201)
  @Post()
  async create(
		@Body() dto: Omit<ReviewModel, '_id'>, // Все свойства модели, за исключением _id
	) {}

	@HttpCode(201)
  @Delete(':id')
  async delete(
		@Param('id') id: string
	) {}
}
