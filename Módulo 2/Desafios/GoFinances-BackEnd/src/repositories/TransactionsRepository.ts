/* eslint-disable no-param-reassign */
import { EntityRepository, Repository, getRepository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const transactionsrepository = getRepository(Transaction);

    const transactions = await transactionsrepository.find();

    const { income } = transactions.reduce(
      (Total: Balance, elemento: Transaction) => {
        if (elemento.type === 'income') {
          Total.income += elemento.value;
        }
        return Total;
      },
      { income: 0, total: 0 } as Balance,
    );

    const { outcome } = transactions.reduce(
      (Total: Balance, elemento: Transaction) => {
        if (elemento.type === 'outcome') {
          Total.outcome += elemento.value;
        }
        return Total;
      },
      { outcome: 0, total: 0 } as Balance,
    );

    const total = income - outcome;

    return { income, outcome, total };
  }
}

export default TransactionsRepository;
