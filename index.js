class Transaction {

  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }

  commit() {
    if (!this.isAllowed()) {
      return false;
    }
    this.time = new Date();
    this.account.addTransaction(this);
    return true;
  }

}

class Withdrawal extends Transaction {

  get value() {
    return this.amount * -1;
  }

  isAllowed() {
    if (this.amount > this.account.balance) {
      return false;
    }
    return true;
  }

}

class Deposit extends Transaction {

  get value() {
    return this.amount;
  }

  isAllowed() {
    return true;
  }

}

class Account {

  constructor(username) {
    this.username = username;
    this.transactions = [];
  }

  get balance() {
    let total = 0;
    this.transactions.forEach(tran => total += tran.value);
    return total;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }

}


// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected

const myAccount = new Account('billybob');

console.log('Transactions: ', myAccount.transactions);
console.log('Starting Balance: ', myAccount.balance);

const t1 = new Deposit(120.00, myAccount);
console.log(t1.commit());

const t2 = new Withdrawal(50.00, myAccount);
console.log(t2.commit());

const t3 = new Withdrawal(80.00, myAccount);
console.log(t3.commit());

console.log('Transactions: ', myAccount.transactions);
console.log('Final Balance: ', myAccount.balance);
