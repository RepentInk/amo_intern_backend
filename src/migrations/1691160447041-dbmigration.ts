import { MigrationInterface, QueryRunner } from "typeorm";

export class Dbmigration1691160447041 implements MigrationInterface {
    name = 'Dbmigration1691160447041'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`permission\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`display_name\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`order_items\` (\`id\` int NOT NULL AUTO_INCREMENT, \`order_id\` int NOT NULL, \`item_id\` int NOT NULL, \`quantity\` int NOT NULL, \`price\` int NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP, \`deleted_at\` datetime(6) NULL, UNIQUE INDEX \`REL_145532db85752b29c57d2b7b1f\` (\`order_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`customer\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`phone_number\` varchar(255) NOT NULL, \`gender\` varchar(255) NULL, \`email\` varchar(255) NULL, \`organization\` varchar(255) NULL, \`created_at\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \`deleted_at\` datetime NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`order\` (\`id\` int NOT NULL AUTO_INCREMENT, \`unique_number\` varchar(255) NOT NULL, \`order_code\` varchar(255) NOT NULL, \`delivery_point\` varchar(255) NOT NULL, \`payment\` varchar(255) NOT NULL, \`status\` varchar(255) NOT NULL, \`amount_paid\` int NOT NULL, \`payment_mode\` varchar(255) NOT NULL, \`order_channel\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \`deleted_at\` datetime(6) NULL, \`user_id\` int NULL, \`customer_id\` int NULL, UNIQUE INDEX \`REL_cd7812c96209c5bdd48a6b858b\` (\`customer_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_log\` (\`id\` int NOT NULL AUTO_INCREMENT, \`activity\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP, \`deleted_at\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`phone_number\` varchar(255) NOT NULL, \`verified\` tinyint NOT NULL, \`pwd_expired_at\` datetime NOT NULL, \`pwd_code\` int NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \`deleted_at\` datetime(6) NULL, \`role_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`role\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`items\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NULL, \`unit\` int NOT NULL, \`price\` int NOT NULL, \`created_at\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \`deleted_at\` datetime NULL, \`category_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`categories\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`created_at\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \`deleted_at\` datetime NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`role_permission\` (\`role_id\` int NOT NULL, \`permission_id\` int NOT NULL, INDEX \`IDX_3d0a7155eafd75ddba5a701336\` (\`role_id\`), INDEX \`IDX_e3a3ba47b7ca00fd23be4ebd6c\` (\`permission_id\`), PRIMARY KEY (\`role_id\`, \`permission_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`order_items\` ADD CONSTRAINT \`FK_145532db85752b29c57d2b7b1f1\` FOREIGN KEY (\`order_id\`) REFERENCES \`order\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order\` ADD CONSTRAINT \`FK_199e32a02ddc0f47cd93181d8fd\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order\` ADD CONSTRAINT \`FK_cd7812c96209c5bdd48a6b858b0\` FOREIGN KEY (\`customer_id\`) REFERENCES \`customer\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_a2cecd1a3531c0b041e29ba46e1\` FOREIGN KEY (\`role_id\`) REFERENCES \`role\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`items\` ADD CONSTRAINT \`FK_0c4aa809ddf5b0c6ca45d8a8e80\` FOREIGN KEY (\`category_id\`) REFERENCES \`categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`role_permission\` ADD CONSTRAINT \`FK_3d0a7155eafd75ddba5a7013368\` FOREIGN KEY (\`role_id\`) REFERENCES \`role\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`role_permission\` ADD CONSTRAINT \`FK_e3a3ba47b7ca00fd23be4ebd6cf\` FOREIGN KEY (\`permission_id\`) REFERENCES \`permission\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`role_permission\` DROP FOREIGN KEY \`FK_e3a3ba47b7ca00fd23be4ebd6cf\``);
        await queryRunner.query(`ALTER TABLE \`role_permission\` DROP FOREIGN KEY \`FK_3d0a7155eafd75ddba5a7013368\``);
        await queryRunner.query(`ALTER TABLE \`items\` DROP FOREIGN KEY \`FK_0c4aa809ddf5b0c6ca45d8a8e80\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_a2cecd1a3531c0b041e29ba46e1\``);
        await queryRunner.query(`ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_cd7812c96209c5bdd48a6b858b0\``);
        await queryRunner.query(`ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_199e32a02ddc0f47cd93181d8fd\``);
        await queryRunner.query(`ALTER TABLE \`order_items\` DROP FOREIGN KEY \`FK_145532db85752b29c57d2b7b1f1\``);
        await queryRunner.query(`DROP INDEX \`IDX_e3a3ba47b7ca00fd23be4ebd6c\` ON \`role_permission\``);
        await queryRunner.query(`DROP INDEX \`IDX_3d0a7155eafd75ddba5a701336\` ON \`role_permission\``);
        await queryRunner.query(`DROP TABLE \`role_permission\``);
        await queryRunner.query(`DROP TABLE \`categories\``);
        await queryRunner.query(`DROP TABLE \`items\``);
        await queryRunner.query(`DROP TABLE \`role\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP TABLE \`user_log\``);
        await queryRunner.query(`DROP INDEX \`REL_cd7812c96209c5bdd48a6b858b\` ON \`order\``);
        await queryRunner.query(`DROP TABLE \`order\``);
        await queryRunner.query(`DROP TABLE \`customer\``);
        await queryRunner.query(`DROP INDEX \`REL_145532db85752b29c57d2b7b1f\` ON \`order_items\``);
        await queryRunner.query(`DROP TABLE \`order_items\``);
        await queryRunner.query(`DROP TABLE \`permission\``);
    }

}
