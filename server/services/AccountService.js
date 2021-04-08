import Account from '../models/Account';

class AccountService {

  async getAll(){
   return await Account.find().exec();
  }

  async getById(id){
    return await Account.findById(id).exec();
  }

  async create(account){
    return await Account.create(account);
  }

  async find(query){
    return await Account.find(query).exec();
  }

  async findOne(query){
    return await Account.findOne(query).exec();
  }
}

export default AccountService;