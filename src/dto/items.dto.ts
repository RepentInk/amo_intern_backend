export class ItemsDto {
  readonly id: number;
  readonly name: string;
  readonly description?: string;
  readonly unit: number;
  readonly price: number;
  readonly category_id: number;
  readonly created_at: Date;
  readonly updated_at: Date;
  readonly deleted_at: Date;
}
