import AccountService from "./AccountService";
import CustomerService from "./CustomerService";

class ValidatorService {

    isNumber = n => {
        return !isNaN(parseFloat(n)) && isFinite(n);
    };

    validateNewAccount = async account => {
        const errors = [];
        const {
            number,
            initialBalance,
            customerId
        } = account;

        if(!number){
            errors.push("Account number 'number' paramter is required");
        } else if(!this.isNumber(number)){
            errors.push("Invalid account number");
        } else if(number.length != 10){
            errors.push("Account number must be a 10 digit number");
        }

        if(!this.isNumber(initialBalance)){
            errors.push("Initial account balance is invalid");
        }

        const cs = new CustomerService();
        const customer = await cs.findOne({_id: customerId});
        if(!customer){
            errors.push("Cutomer with id " + customerId + " does not exist");
        }

        return errors;
    }

    validateNewDebit = async debit => {
        const errors = [];
        const {
            to,
            amount,
            accountId
        } = debit;
        const as = new AccountService();
        const destinationAccount = await as.getById(to);
        if(!destinationAccount){
            errors.push("Destination account does not exist");
        }
        if(!amount){
            errors.push("Amount 'amount' paramter is required");
        } else if(!this.isNumber(amount)){
            errors.push("Invalid amount");
        } else if(amount <= 0){
            errors.push("Amount should be greater than zero");
        }

        const sourceAccount = await as.getById(accountId);
        if(!sourceAccount){
            errors.push("Source account does not exist");
        }

        return errors;

    }
}

export default ValidatorService;