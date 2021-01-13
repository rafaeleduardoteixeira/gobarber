import { query } from "express";
import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class AlterProviderField1603235770287 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("appointments", "provider");
    await queryRunner.addColumn(
      "appointments",
      new TableColumn({
        name: "provider_id",
        type: "int",
        isNullable: true,
      })
    );

    await queryRunner.createForeignKey(
      "appointments",
      new TableForeignKey({
        name: "AppointmentProvider",
        columnNames: ["provider_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "users",
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("appointments", "userAppointmentProvider_id_fk");
    await queryRunner.dropColumn("appointments", "provider_id");
    await queryRunner.addColumn(
      "appointments",
      new TableColumn({
        name: "provider",
        type: "string",
        isNullable: true,
      })
    );
  }
}
