interface Account {
    cardAccount: string,
    balance: number,
    creditLimit?: number,
    checkBalance(): void,
    withDraw(amount: number): void,
    replenishment(amount: number): void
}

class DebitAccount implements Account {
    balance: number;
    cardAccount: string;
    constructor(balance: number, cardAccount: string) {
        this.balance = balance;
        this.cardAccount = cardAccount;
    }

    checkBalance() {
        console.log('Проверка баланса...');
        console.log(`Баланс на счете ${this.cardAccount}: ${this.balance}`);
    }

    withDraw(amount: number) {
        if (amount > this.balance) {
            console.log('На счету не хватает средств для снятия');
            return;
        }
        if (amount < 0 ) {
            console.log('Сумма для снятия должна быть положительной');
            return;
        }
        this.balance -= amount;
        console.log(`Сняли со счета ${this.cardAccount}: ${amount}`);
    }

    replenishment(amount: number) {
        if (amount < 0 ) {
            console.log('Сумма для пополнения должна быть положительной');
            return;
        }
        this.balance += amount;
        console.log(`Пополнили счет ${this.cardAccount} на: ${amount}`);
    }
}

class CreditAccount implements Account {
    balance: number;
    creditLimit: number;
    cardAccount: string;

    constructor(balance:number, creditLimit: number, cardAccount: string) {
        this.balance = balance;
        this.creditLimit = creditLimit;
        this.cardAccount = cardAccount;
    }

    checkBalance() {
        console.log(`Баланс на счете ${this.cardAccount}: ${this.balance}, Кредитный лимит: ${this.creditLimit}`);
    }

    withDraw(amount: number) {
        if (amount < 0) {
            console.log('Сумма для снятия должна быть положительной');
            return;
        }
        if (this.balance + this.creditLimit < amount) {
            console.log('Недостаточно средств и кредитного лимита для снятия суммы');
            return;
        }
        this.balance -= amount;
        console.log(`Сняли со счета ${this.cardAccount}: ${amount}`);
    }

    replenishment(amount: number) {
        if (amount < 0) {
            console.log('Сумма для пополнения должна быть положительной');
            return;
        }
        this.balance += amount;
        console.log(`Пополнили счет ${this.cardAccount} на: ${amount}`);
    }
}

console.log('Дебетовая карта');
const debit = new DebitAccount(500, 'Debit-1');
debit.checkBalance();
debit.replenishment(200);
debit.withDraw(100);
debit.withDraw(700);
debit.checkBalance();
console.log('=====================');
console.log('Кредитная карта');

const credit = new CreditAccount(500, 300, 'Credit-1');
credit.checkBalance();
credit.replenishment(100);
credit.withDraw(100);
credit.withDraw(900);
credit.checkBalance();
