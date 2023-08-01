export class ItemsDto {
  id: number;
  name: string;
  description?: string;
  unit: number;
  price: number;
  category_id: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}
