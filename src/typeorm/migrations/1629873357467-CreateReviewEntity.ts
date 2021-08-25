import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateReviewEntity1629873357467 implements MigrationInterface {
	name = 'CreateReviewEntity1629873357467'

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE \`tripple\`.\`reviews\` (\`id\` char(36) NOT NULL, \`user_id\` char(36) NOT NULL, \`place_id\` char(36) NOT NULL, \`content\` varchar(5000) NOT NULL, \`attached_photo_ids\` json NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, INDEX \`place_id_index\` (\`place_id\`), UNIQUE INDEX \`user_id_place_id_unique_index\` (\`user_id\`, \`place_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
		)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`DROP INDEX \`user_id_place_id_unique_index\` ON \`tripple\`.\`reviews\``,
		)
		await queryRunner.query(
			`DROP INDEX \`place_id_index\` ON \`tripple\`.\`reviews\``,
		)
		await queryRunner.query(`DROP TABLE \`tripple\`.\`reviews\``)
	}
}
