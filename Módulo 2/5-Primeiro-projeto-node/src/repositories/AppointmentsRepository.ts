/* eslint-disable max-len */
import { isEqual } from 'date-fns';
import Appoitment from '../models/Appointment';

// DTO - Data Transfer Object: é útil para passar dados entre métodos/classes/arquivos/etc.
interface CreateAppointmentDTO {
  provider: string;
  date: Date;
}

class AppointmentsRepository {
  private appointments: Appoitment[];

  constructor() {
    this.appointments = [];
  }

  public all(): Appoitment[] {
    return this.appointments;
  }

  public findByDate(date: Date): Appoitment | null {
    const findAppointment = this.appointments.find((appointment) => isEqual(date, appointment.date));

    return findAppointment || null;
  }

  public create({ provider, date }: CreateAppointmentDTO): Appoitment {
    const appointment = new Appoitment({ provider, date });

    this.appointments.push(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;

// Repositório é uma conexão entre a persistência de dados (geralmente um banco de dados) e o aplicativo.
// Nota: neste contexto, o repositório não é um repositório de código, como os usados pelo git.
// Normalmente temos um repositório por modelo.
// O repositório é a classe responsável pela lógica de criação / localização / exclusão / atualização de dados

// É importante conectar-se à camada de persistência e retornar todos os compromissos pertencentes ao repositório, não à rota.

// DTO:
// É particularmente útil porque você pode adicionar / remover facilmente o número de parâmetros a serem recebidos em um método.
// Além disso, o editor pode ajudar mostrando o nome e o tipo dos parâmetros esperados.

// Quatro benefícios principais de usar o padrão de repositório:
// Armazenamento de dados como um mero detalhe da aplicação geral.
// Muito mais fácil para testar.
// Dependência unilateral.
// Ilusão de memória.

// isEqual: as datas fornecidas são iguais? (retorna booleano)
