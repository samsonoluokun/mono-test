import Transaction from '../models/Transaction';

class TransactionService {

  async getAll(){
   return await Transaction.find().exec()
  }

  async getById(id){
    return await Transaction.findById(id).exec()
  }

  async create(transaction){
    return await Transaction.create(transaction)
  }

  async find(query){
    return await Transaction.find(query).exec()
  }

  async findOne(query){
    return await Transaction.findOne(query).exec()
  }
}

export default TransactionService;