import BankAccountController from "./BankAccountController"
import CustomerController from "./CustomerController";
import TransferController from "./TransferController";

export const registerRoutes = app => {
  // get all customers
  app.get('/customers', CustomerController.getCustomers);

  // Create bank account. Payload : number, initialBalance, customerId
  app.post('/bank-account/create', BankAccountController.createBankAccount);

  // Get customer accounts. Query-Params : customerId
  app.get('/bank-account', BankAccountController.getCustomerAccounts);

  // Get account balance. Query-Params : number /* Account number  */
  app.get('/bank-account/balance', BankAccountController.getAccountBalance);

  // Transfer amount. Payload : to /* Destination Account */ , amount, accountId /* Source Account */
  app.post('/transfer', TransferController.transferAmount);

  // Get transaction history. Query-Params : number /* Account number  */
  app.get('/transfer', TransferController.getTransactionHistory);
}
