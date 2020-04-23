import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  private executeValidation({ title, value, type }: Request) {
    if (!title || !value || !type) {
      throw Error('Invalid entries.');
    }
    if (type !== 'income' && type !== 'outcome') {
      throw Error('Invalid transaction type.');
    }
  }

  public execute({ title, value, type }: Request): Transaction {
    this.executeValidation({ title, value, type });
    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    return transaction;
  }
}

export default CreateTransactionService;
