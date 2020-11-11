export interface MOrders {
  Oid: string;
  OrderMain: string;
  Name: string;
  Detail: string;
  Price: string;
  Currency: string;
  Quantity: number;
  TotalPrice: string;
  PaymentMethod: string;
  Date: string;
  Note?: any;
  OptimisticLockField?: any;
  GCRecord?: any;
}
