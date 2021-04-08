const { default: ValidatorService } = require("./server/services/ValidatorService");

describe("validate new bank account 3 error fields payload", () => {
    test('Expect errors length equals 3', () => {
        expect()
        jest.setTimeout(10000);
        const payload = {
            number: "11111222",
            initialBalance: -1,
            customerId: null
        };
        const vs = new ValidatorService();
        vs.validateNewAccount(payload).then(result => {
            expect(result.length).toBe(3);
        }).catch(err => {
            console.log(err);
        })
    });
});


describe("validate a new bank account valid payload", () => {
    test('Expect errors length equals 0', () => {
        expect()
        jest.setTimeout(10000);
        const payload = {
            number: "1111122222",
            initialBalance: 50,
            customerId: 8
        };
        const vs = new ValidatorService();
        vs.validateNewAccount(payload).then(result => {
            expect(result.length).toBe(0);
        }).catch(err => {
            console.log(err);
        })
    });
});




describe("validate a new Transfer invalid payload", () => {
    test('Expect errors length equals 3', () => {
        expect()
        jest.setTimeout(10000);
        const payload = {
            to: "",
            amount: 0,
            accountId: "lshoafhod"
        };
        const vs = new ValidatorService();
        vs.validateNewDebit(payload).then(result => {
            expect(result.length).toBe(3);
        }).catch(err => {
            console.log(err);
        })
    });
});



describe("validate a new Transfer invalid payload", () => {
    test('Expect errors length equals 2', () => {
        expect()
        jest.setTimeout(10000);
        const payload = {
            to: "kdsahlaflhdfi",
            amount: 50,
            accountId: "lshoafhod"
        };
        const vs = new ValidatorService();
        vs.validateNewDebit(payload).then(result => {
            expect(result.length).toBe(2);
        }).catch(err => {
            console.log(err);
        })
    });
});