import { getRepository } from 'typeorm';
import Transaction from '../models/Transaction';
import AppError from '../errors/AppError';

interface Request {
  id: string;
}

class DeleteTransactionService {
  public async execute({ id }: Request): Promise<AppError> {
    const deleteTransactionRepository = getRepository(Transaction);

    const findId = await deleteTransactionRepository.findOne({
      where: { id },
    });

    if (!findId) {
      throw new AppError('Transação não existente!');
    }

    await deleteTransactionRepository.delete(id);

    return new AppError('Deletada com sucesso!', 204);
  }
}

export default DeleteTransactionService;
