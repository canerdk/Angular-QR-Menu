import {MCategories} from "./MCategories";
import {MCustomer} from "./MCustomer";
import {MProduct} from "./MProduct";

export interface MMenu {
  Oid: string;
  Customers: MCustomer[];
  Name: string;
  Description?: any;
  LanguageCode: string;
  Theme: string;
  OptimisticLockField: number;
  GCRecord?: any;
}
