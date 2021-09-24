/* eslint-disable max-len */
// import { uuid } from 'uuidv4';
const { v4: uuid } = require('uuid'); // used to create an universal unique ID

class Appointment {
  id: string;

  provider: string;

  date: Date;

  constructor({ provider, date }: Omit<Appointment, 'id'>) {
    this.id = uuid();
    this.provider = provider;
    this.date = date;
  }
}

export default Appointment;

// Criando uma classe Appointment e usando seu construtor ao criar um novo compromisso.
// Nosso objetivo é tornar os arquivos de rotas o mais limpos possível.
// Nota: quando temos um tipo de dados que será armazenado, é uma boa prática criar um Model para ele.

// Outro recurso interessante do TypeScript é o tipo de utilitário Omit <Type, Keys>.
// É útil permitir que o construtor seja chamado com um objeto Appointment,
// mas sem o id (que é gerado durante a construção da nova instância)
