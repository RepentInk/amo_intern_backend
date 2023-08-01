// import { Category } from './categories.interface';

export interface Items {
  id: number;
  name: string;
  description?: string;
  unit: number;
  price: number;
  category_id: number; // Foreign key from categories
  created_at: Date;
  updated_at: Date | null;
  deleted_at: Date | null;
}
