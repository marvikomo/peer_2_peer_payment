import { IUser } from "./Entity/user.entity";
import * as shortid from "shortid";
import { Wallet } from "./Service/wallet.service";

export class User extends Wallet {
  private user_data: IUser[] = [];

  constructor() {
    super();
    if (User._instance) {
      throw new Error("cannot create a new instace of this class");
    }
    User._instance = this;
  }

  private static _instance: User = new User();

  public static get instance(): User {
    return User._instance;
  }

  createUser(data: Omit<IUser, "id" | "account_no">): IUser {
    let user = {
      id: shortid.generate(),
      account_no: Math.floor(
        Math.pow(10, 10 - 1) + Math.random() * 9 * Math.pow(10, 10 - 1)
      ),
      ...data,
    };
    this.user_data.push(user);
    this.createWallet(user.account_no);
    return user;
  }
}
