import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreatePointTransactionEntity1629875508551
	implements MigrationInterface
{
	name = 'CreatePointTransactionEntity1629875508551'

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE \`tripple\`.\`point_transactions\` (\`id\` char(36) NOT NULL, \`eventType\` enum ('REVIEW') NOT NULL, \`source_id\` char(36) NOT NULL, \`amount\` int UNSIGNED NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), INDEX \`source_id_event_type_index\` (\`source_id\`, \`eventType\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
		)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`DROP INDEX \`source_id_event_type_index\` ON \`tripple\`.\`point_transactions\``,
		)
		await queryRunner.query(`DROP TABLE \`tripple\`.\`point_transactions\``)
	}
}
