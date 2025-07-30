import { Transaction } from "../transaction.model";


export interface DetailedStatement {
  accountNumber: string;
  fromDate: string;
  toDate: string;
  transactions: Transaction[];
}
