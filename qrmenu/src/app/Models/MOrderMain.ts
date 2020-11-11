export interface MOrderMain {
  Oid: string;
  Customers: string;
  Table: string;
  Name: string;
  Date: string;
  PaymentState: number;
  PrepareState: number;
  Note: string;
  Confirmation: boolean;
  OptimisticLockField?: any;
  GCRecord?: any;
}
