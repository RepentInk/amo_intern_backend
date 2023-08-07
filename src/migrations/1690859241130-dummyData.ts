import { MigrationInterface, QueryRunner } from 'typeorm';
import { Category } from '../seeds/dummy.category';
import { Items } from '../seeds/dummy.items';
import { Orders } from '../seeds/dummy.orders';
import { OrderItems } from '../seeds/dummy.orderItems';
import { Users } from '../seeds/dummy.users';
import { Customers } from '../seeds/dummy.customers';
import { UserLog } from '../seeds/dummy.userLog';
import { Roles } from '../seeds/dummy.role';
import { Permissions } from '../seeds/dummy.permissions';
import { RolePermissions } from '../seeds/dummy.rolePermissions';

export class DummyData1690859241130 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const entityManager = queryRunner.manager;

    await entityManager.save('Users', Users);
    await entityManager.save('Order', Orders);
    await entityManager.save('Items', Items);
    await entityManager.save('Customers', Customers);
    await entityManager.save('Roles', Roles);
    await entityManager.save('Category', Category);
    await entityManager.save('OrderItems', OrderItems);
    await entityManager.save('UserLog', UserLog);
    await entityManager.save('Permissions', Permissions);
    await entityManager.save('RolePermissions', RolePermissions);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('Users');
    await queryRunner.dropTable('UserLog');
    await queryRunner.dropTable('Items');
    await queryRunner.dropTable('Orders');
    await queryRunner.dropTable('OrderItems');
    await queryRunner.dropTable('Roles');
    await queryRunner.dropTable('Permissions');
    await queryRunner.dropTable('RolePermissions');
    await queryRunner.dropTable('Customers');
    await queryRunner.dropTable('Category');
  }
}
