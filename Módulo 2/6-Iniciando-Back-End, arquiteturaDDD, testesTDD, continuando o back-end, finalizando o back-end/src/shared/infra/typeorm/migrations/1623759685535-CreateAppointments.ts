/* eslint-disable max-len */
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateAppointments1623759685535 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'appointments',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'provider',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'date',
            type: 'timestamp with time zone',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('appointments');
  }
}

/**
 * Linha do tempo fictícia que mostra a importancia da migrations,
 * que é como um versionamento git utilizado para banco de dados
 * Primeira semana: Cria a tabela Agendamentos
 * Segunda semana: Cria a tabela Usuários
 * (NOVO DEV) Terceira semana: Edição da tabela Agendamentos
 * Quarta semana: Cria a tabela Compras
 */
// Só pode alterar uma migration se ainda ela não foi enviada para o sistema de controle de versão
// Método down utilizado para desfazer o que é feito no método up(Tem o que a migration em questão vai fazer)
