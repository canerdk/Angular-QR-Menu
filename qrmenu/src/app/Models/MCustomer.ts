import {MSlider} from "./MSlider";
import {MMenu} from "./MMenu";

export interface MCustomer {
  Oid: string;
  Logo?: any;
  Name: string;
  Surname: string;
  CompanyName: string;
  CompanyAddress: string;
  CompanyPhone?: any;
  StartDate?: any;
  LogoURL: string;
  OptimisticLockField: number;
  GCRecord?: any;
  Menus: MMenu;
}
