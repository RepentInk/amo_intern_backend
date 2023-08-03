import { CategoryDto } from 'src/dto/category.dto';

export interface CategoryInterface {
  findAll(): Promise<CategoryDto[]>;
  findOne(id: number): Promise<CategoryDto>;
  create(categoryDto: CategoryDto): Promise<CategoryDto>;
  update(categoryDto: CategoryDto, id: number): Promise<CategoryDto>;
  delete(id: number): Promise<CategoryDto>;
}
