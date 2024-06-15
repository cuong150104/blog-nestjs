import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserAddEmailColumToUserTable1718466014872 implements MigrationInterface {
    name = 'CreateUserAddEmailColumToUserTable1718466014872'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`email\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`email\``);
    }

}
