import { User } from "./user";

//initiated a single instance of user
let user = User.instance;

let A = user.createUser({
  firstname: "Marv",
  lastname: "John",
  email: "ikmarv@gmail",
  password: "1234",
});

let B = user.createUser({
  firstname: "Jane",
  lastname: "John",
  email: "jkmarv@gmail",
  password: "1234",
});

console.log(user.deposit(A.account_no, 1000));
console.log(user.send(A.account_no, B.account_no, 20));
console.log("balance", user.checkBalance(B.account_no));
console.log(user)
