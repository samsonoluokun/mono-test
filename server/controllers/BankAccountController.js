import AccountService from "../services/AccountService";
import ValidatorService from "../services/ValidatorService";

class BankAccountController {
    static async createBankAccount(req, res) {
        console.log("createBankAccount Body", req.body);
        const {
            number,
            initialBalance,
            customerId
        } = req.body;

        const validatorService = new ValidatorService();
        const validationErrors = await validatorService.validateNewAccount(req.body);
        if (validationErrors.length > 0) {
            return res.status(400).json({
                errors: validationErrors
            });
        }
        const as = new AccountService();
        try {
            const account = await as.create({
                number,
                balance: initialBalance,
                customerId
            });

            res.status(200).json(account);
        } catch (err) {
            console.log(err);
            return res.status(400).json({
                errors: ["An error occured while creating account"]
            });
        }
    }

    static async getCustomerAccounts(req, res) {
        console.log("getCustomerAccounts Body", req.query);
        const {
            customerId
        } = req.query;

        if (!customerId) {
            return res.status(400).json({
                errors: ["Customer ID 'customerId' parameter is required"]
            });
        }
        const as = new AccountService();
        try {
            const accounts = await as.find({customerId});

            res.status(200).json(accounts);
        } catch (err) {
            console.log(err);
            return res.status(400).json({
                errors: ["An error occured while fetching customer accounts"]
            });
        }
    }

    static async getAccountBalance(req, res) {
        console.log("getAccountBalance Body", req.query);
        const {
            number
        } = req.query;

        if (!number) {
            return res.status(400).json({
                errors: ["Account number 'number' parameter is required"]
            });
        } else if(number.length != 10){
            return res.status(400).json({
                errors: ["Account number 'number' must be 10 digits"]
            });
        }
        const as = new AccountService();
        try {
            const account = await as.findOne({number});
            if(!account){
                return res.status(400).json({
                    errors: [`Unable to find account with number ${number}`]
                });
            }
            res.status(200).json(account);
        } catch (err) {
            console.log(err);
            return res.status(400).json({
                errors: ["An error occured while fetching customer accounts"]
            });
        }
    }

}

export default BankAccountController;