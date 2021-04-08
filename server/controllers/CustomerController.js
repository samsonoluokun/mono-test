import CustomerService from "../services/CustomerService";

class CustomerController {
    static async getCustomers(req, res){
        const customers = await new CustomerService().find();

        res.status(200).json(customers);
    }
}

export default CustomerController;