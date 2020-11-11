import {MMenu} from "./MMenu";
import {MLanguage} from "./MLanguage";
import {MProduct} from "./MProduct";

export interface MCategories {
  Oid: string;
  Menus: MMenu[];
  Name: string;
  Detail?: any;
  Priority: string;
  OptimisticLockField: number;
  GCRecord?: any;
}
