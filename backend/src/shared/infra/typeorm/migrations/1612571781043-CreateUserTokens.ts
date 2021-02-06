import { MigrationInterface, QueryRunner, Table } from "typeorm";

export default class CreateUserTokens1612571781043 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user_tokens',
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true
          },
          {
            name: "token",
            type: "varchar"
          },
          {
            name: "user_id",
            type: "int"
          },
          {
            name: "created_at",
            type: "datetime",
            default: 'now()'
          },
          {
            name: "updated_at",
            type: "datetime",
            default: 'now()'
          },
        ],
        foreignKeys: [
          {
            name: 'TokenUser',
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            columnNames: ['user_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
          }
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user_tokens')
  }
}
