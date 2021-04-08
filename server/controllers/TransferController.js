import AccountService from "../services/AccountService";
import TransactionService from "../services/TransactionService";
import ValidatorService from "../services/ValidatorService";

class TransferController {
    
    static async transferAmount(req, res) {
        console.log("transferAmount Body", req.body);
        const {
            to,
            amount,
            accountId
        } = req.body;

        // Validate debit payload
        const validatorService = new ValidatorService();
        const validationErrors = await validatorService.validateNewDebit(req.body);
        if (validationErrors.length > 0) {
            return res.status(400).json({
                errors: validationErrors
            });
        }

        const as = new AccountService();
        const ts = new TransactionService();

        let sourceAccount = await as.getById(accountId);
        // check source account balance
        if (sourceAccount.balance < amount) {
            return res.status(400).json({
                errors: ["Insufficient balance"]
            });
        }

        let destinationAccount = await as.getById(to);
        // Create source account debit
        let debit;
        try {
            debit = await ts.create({
                type: 'debit',
                to: destinationAccount.id,
                accountId,
                amount,
            });
        } catch (err) {
            console.log(err);
            return res.status(400).json({
                errors: ["An error occured while creating debit for source account"]
            });
        }


        // Create destination account credit
        let credit;
        try {
            credit = await ts.create({
                type: 'credit',
                from: accountId,
                accountId: to,
                amount,
            })
        } catch (err) {
            console.log(err);
            return res.status(400).json({
                errors: ["An error occured while creating credit for destination account"]
            });
        }


        // Update destination account balance
        try {
            destinationAccount.balance += amount;
            destinationAccount = await destinationAccount.save();
        } catch (err) {
            console.log(err);
            return res.status(400).json({
                errors: ["An error occured while updating destination account balance"]
            });
        }


        // Update source account balance
        try {
            sourceAccount.balance -= amount;
            sourceAccount = await sourceAccount.save();

            res.status(200).json({
                message: "Transfer successful"
            });
        } catch (err) {
            console.log(err);
            return res.status(400).json({
                errors: ["An error occured while updating source account balance"]
            });
        }
    }


    static async getTransactionHistory(req, res){
        console.log("getTransactionHistory Query", req.query);
        const {
            number
        } = req.query;
        if(!number){
            return res.status(400).json({
                errors: ["Account number 'number' parameter is required"]
            });
        } else if(number.length != 10){
            return res.status(400).json({
                errors: ["Account number 'number' must be 10 digits"]
            });
        }
        const ts = new TransactionService();
        const as = new AccountService();

        let account;
        try {
            account = await as.findOne({number});
            if(!account){
                return res.status(400).json({
                    errors: [`Could not find account with account number '${number}'`]
                });
            }
            const transactions = await ts.find({accountId: account.id});
            res.status(200).json(transactions);
        } catch (err) {
            console.log(err);
            return res.status(400).json({
                errors: ["An error occured while fetching transaction history"]
            });
        }

    }


    
}

export default TransferController;