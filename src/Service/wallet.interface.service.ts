import { IWallet } from "../Entity/wallet.entity";

export interface IWalletService {
  createWallet(user_id: number): boolean;
  deposit(acct_no: number, amount: number): boolean;
  send(from: number, to: number, amount: number): boolean;
  checkBalance(user_id: number): number;
  transfer(from: number, amount: number): boolean;
}
