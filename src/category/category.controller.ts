import { CategoryService } from './category.service';
import { Controller, Get } from '@nestjs/common';
import { Category } from './entities/category.entity';

@Controller('categories')
export class CategoryController {
    constructor(private categoryService: CategoryService) { }

    @Get()
    findAll(): Promise<Category[]> {
        return this.categoryService.findAll();
    }
}
