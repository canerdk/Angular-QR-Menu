import {MCategories} from "./MCategories";
import {MImage} from "./MImage";
import {MIngredient} from "./MIngredient";

export interface MProduct {
  Oid: string;
  Category: MCategories[];
  Image?: any;
  Name: string;
  Detail: string;
  Price: number;
  Currency: string;
  Category1: MCategories[];
  Quantity: number;
  TotalPrice: number;
  PaymentMethod: string;
  Ingredient: MIngredient[];
  Table: string;
  Date: string;
  Customer: string;
  OrderMain: string;
  OptimisticLockField: number;
  GCRecord?: any;
}
