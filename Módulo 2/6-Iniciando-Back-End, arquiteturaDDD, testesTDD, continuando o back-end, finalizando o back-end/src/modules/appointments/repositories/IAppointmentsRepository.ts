// SOLID -> Single Responsability Principle, Open Closed Principle,
// Liskov Substitution Principle, Interface Segregation Principle,
// Dependency Inversion Principle
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindAllinMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllinMonthFromProviderDTO';
import IFindAllinDayFromProviderDTO from '@modules/appointments/dtos/IFindAllinDayFromProviderDTO copy';

interface IAppointmentsRepository {
    create(data: ICreateAppointmentDTO): Promise<Appointment>;
    findByDate(date: Date): Promise<Appointment | undefined>;
    findAllInMonthFromProvider(
        data: IFindAllinMonthFromProviderDTO,
    ): Promise<Appointment[]>;
    findAllInDayFromProvider(
        data: IFindAllinDayFromProviderDTO,
    ): Promise<Appointment[]>;
}

export default IAppointmentsRepository;
