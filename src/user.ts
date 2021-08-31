import { IUser } from "./Entity/user.entity";
import * as shortid from "shortid";
import { Wallet } from "./Service/wallet.service";

export class User extends Wallet {
  private user_data: IUser[] = [];

  constructor() {
    super();
    if (User._instace) {
      throw new Error("cannot create a new instace of this class");
    }
    User._instace = this;
  }

  private static _instace: User = new User();

  public static get instance(): User {
    return User._instace;
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
