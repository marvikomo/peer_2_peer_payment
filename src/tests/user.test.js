const { Wallet } = require("../Service/wallet.service");
const { User } = require("../user");

describe("payment", () => {
  let user;
  let UserA, UserB;
  beforeEach(() => {
    user = User.instance;
  });

  it("add User B", () => {
    let B = user.createUser({
      firstname: "sam",
      lastname: "gift",
      email: "sam@gmail",
      password: "1234",
    });

    UserB = B;

    expect(B).toEqual(
      user.user_data.filter((e) => {
        return e.firstname === B.firstname && e.email === B.email;
      })[0]
    );
  });

  it("add User A", () => {
    let A = user.createUser({
      firstname: "Marv",
      lastname: "John",
      email: "marv@gmail",
      password: "1234",
    });
    UserA = A;
    expect(A).toEqual(
      user.user_data.filter((e) => {
        return e.firstname === A.firstname && e.email === A.email;
      })[0]
    );
  });

  it("User A deposits 10 dollars", () => {
    let [data] = user.wallet_data.filter((e) => {
      return e.account_no === UserA.account_no;
    });
    let initialBalance = data.balance;
    user.deposit(UserA.account_no, 10);
    expect(
      user.wallet_data.filter((e) => {
        return e.account_no === UserA.account_no;
      })[0].balance
    ).toEqual(initialBalance + 10);
  });

  it("User B deposits 20 dollars", () => {
    let [data] = user.wallet_data.filter((e) => {
      return e.account_no === UserB.account_no;
    });
    let initialBalance = data.balance;
    user.deposit(UserB.account_no, 20);
    expect(data.balance).toEqual(initialBalance + 20);
  });

  it("User B sends 15 dollars to User A", () => {
    let [dataA] = user.wallet_data.filter((e) => {
      return e.account_no === UserA.account_no;
    });
    let [dataB] = user.wallet_data.filter((e) => {
      return e.account_no === UserB.account_no;
    });

    let userAInitialBalance = dataA.balance;
    let userBInitialBalance = dataB.balance;

    user.send(UserB.account_no, UserA.account_no, 15);

    expect(dataA.balance).toEqual(userAInitialBalance + 15);
    expect(dataB.balance).toEqual(userBInitialBalance - 15);
  });

  it("User A checks their balance and has 25 dollars", () => {
    expect(user.checkBalance(UserA.account_no)).toEqual(25);
  });

  it("User B checks their balance and has 5 dollars", () => {
    expect(user.checkBalance(UserB.account_no)).toEqual(5);
  });

  it("User A transfers 25 dollars from their account", () => {
    let [dataA] = user.wallet_data.filter((e) => {
      return e.account_no === UserA.account_no;
    });
    let userAInitialBalance = dataA.balance;

    user.transfer(UserA.account_no, 25);
    expect(dataA.balance).toEqual(userAInitialBalance - 25);
  });

  it("User A checks their balance and has 0 dollars", () => {
    expect(user.checkBalance(UserA.account_no)).toEqual(0);
  });
});
