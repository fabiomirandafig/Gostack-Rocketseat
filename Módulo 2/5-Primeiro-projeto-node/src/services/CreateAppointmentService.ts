/* eslint-disable max-len */
import { startOfHour } from 'date-fns';

import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface Request {
  date: Date;
  provider: string;
}

class CreateAppointmentService {
  private appointmentsRepository: AppointmentsRepository;

  constructor(appointmentsRepository: AppointmentsRepository) {
    this.appointmentsRepository = appointmentsRepository;
  }

  public execute({ date, provider }: Request): Appointment {
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw Error('This appointment is already booked');
    }

    const appointment = this.appointmentsRepository.create({
      provider,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;

// Recursos de serviços:
// É uma classe.
// É responsável pelas regras de negócios.
// Tem apenas uma tarefa muito específica a cumprir.
// Possui apenas um método público (geralmente denominado execute ou run).
// Em caso de sucesso, retorne dados; em caso de erro, lance um Error () (não tem acesso à camada HTTP (expresso)).

// startOfHour: retorna o início de uma hora para a data fornecida (0 minutos, 0 segundos). O resultado estará no fuso horário local.
