import { MigrationInterface, QueryRunner } from 'typeorm';
import { Category } from 'src/seeds/dummy.category';
import { Items } from 'src/seeds/dummy.items';
import { Orders } from 'src/seeds/dummy.orders';
import { OrderItems } from 'src/seeds/dummy.orderItems';
import { Users } from 'src/seeds/dummy.users';
import { Customers } from 'src/seeds/dummy.customers';
import { UserLog } from 'src/seeds/dummy.userLog';
import { Roles } from 'src/seeds/dummy.role';
import { Permissions } from 'src/seeds/dummy.permissions';
import { RolePermissions } from 'src/seeds/dummy.rolePermissions';

export class DummyData1690859241130 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const entityManager = queryRunner.manager;

    await entityManager.save('Users', Users);
    await entityManager.save('Orders', Orders);
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
