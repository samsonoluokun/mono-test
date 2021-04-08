import Customer from '../models/Customer';

class CustomerService {

  async getAll() {
    return await Customer.find().exec()
  }

  async getById(id) {
    return await Customer.findById(id).exec()
  }

  async create(customer) {
    return await Customer.create(customer)
  }

  async findOne(query) {
    return await Customer.findOne(query).exec()
  }

  async find(query) {
    return await Customer.find(query).exec()
  }

  async populateCustomers() {
    console.log("In populate customers");
    const customers = [
      {
        "id": 1,
        "name": "Abba Kyari"
      },
      {
        "id": 2,
        "name": "Abiola Ajimobi"
      },
      {
        "id": 3,
        "name": "Prakhar Singh"
      },
      {
        "id": 4,
        "name": "Abdul Umar"
      }
    ];

    try {
      await Customer.insertMany(customers.map(e => ({ _id: e['id'], name: e['name'] })));
      console.log("Customers populated");
    } catch (err) {
      console.log(err);
    }
  }
}

export default CustomerService;