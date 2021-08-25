import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreatePointTransactionEntity1629876780846
	implements MigrationInterface
{
	name = 'CreatePointTransactionEntity1629876780846'

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE \`tripple\`.\`point_transactions\` (\`id\` char(36) NOT NULL, \`eventType\` enum ('REVIEW') NOT NULL, \`resource_id\` char(36) NULL, \`user_id\` char(36) NOT NULL, \`amount\` int UNSIGNED NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), INDEX \`user_id_index\` (\`user_id\`), INDEX \`source_id_event_type_index\` (\`resource_id\`, \`eventType\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
		)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`DROP INDEX \`source_id_event_type_index\` ON \`tripple\`.\`point_transactions\``,
		)
		await queryRunner.query(
			`DROP INDEX \`user_id_index\` ON \`tripple\`.\`point_transactions\``,
		)
		await queryRunner.query(`DROP TABLE \`tripple\`.\`point_transactions\``)
	}
}
