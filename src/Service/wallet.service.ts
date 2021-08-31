import { IWallet } from "../Entity/wallet.entity";
import { IWalletService } from "./wallet.interface.service";

export abstract class Wallet implements IWalletService {
  private wallet_data: IWallet[] = [];

  costructor() {}

  createWallet(account_no: number) {
    let data = {
      account_no,
      balance: 0,
    };
    this.wallet_data.push(data);
    return true;
  }

  deposit(acct: number, amount: number): boolean {
    let [data] = this.wallet_data.filter((e) => {
      return e.account_no === acct;
    });
    data.balance += amount;
    return true;
  }

  send(from: number, to: number, amount: number): boolean {
    let [From] = this.wallet_data.filter((e) => {
      return e.account_no === from;
    });

    let [To] = this.wallet_data.filter((e) => {
      return e.account_no === to;
    });

    if (From.balance < amount) {
      throw new Error("Your balance is insufficient");
    }

    From.balance -= amount;
    To.balance += amount;

    return true;
  }

  checkBalance(acct: number): number {
    let [data] = this.wallet_data.filter((e) => {
      return e.account_no === acct;
    });
    return data.balance;
  }

  transfer(from: number, amount: number): boolean {
    let [data] = this.wallet_data.filter((e) => {
      return e.account_no === from;
    });
    data.balance -= amount;
    return true;
  }
}
