import { CategoryService } from './category.service';
import { Controller, Get } from '@nestjs/common';
import { Category } from './entities/category.entity';
import { Public } from 'src/decorator/public.decorator';

@Controller('categories')
export class CategoryController {
    constructor(private categoryService: CategoryService) { }
    
    @Public()
    @Get()
    findAll(): Promise<Category[]> {
        return this.categoryService.findAll();
    }
}
