export interface MIngredient {
  Oid: string;
  Name: string;
  Price: string;
  FreeOrNot: boolean;
  OptimisticLockField: number;
  GCRecord?: any;
}
