import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1764714138592 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO "todos" ("title", "completed")
      VALUES ('Initial todo item', false)
    `);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async down(queryRunner: QueryRunner): Promise<void> {}
}
