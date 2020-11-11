import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {MCustomer} from '../Models/MCustomer';
import {MSlider} from '../Models/MSlider';
import {MMenu} from '../Models/MMenu';
import {MCategories} from '../Models/MCategories';
import {MProduct} from '../Models/MProduct';
import {catchError, timeout} from 'rxjs/operators';
import {MOrders} from '../Models/MOrders';
import {MOrderMain} from '../Models/MOrderMain';

@Injectable({
  providedIn: 'root'
})
export class Service {
  BaseURL = 'http://serviceaksular.duloriaqrmenuapp.com/odata/';
  LastURL = '&$expand=Products($expand=Image1)';

  // forslider
  SliderURL = 'http://serviceaksular.duloriaqrmenuapp.com/odata/Customers(';

  // for customer
  CustLink = 'http://serviceaksular.duloriaqrmenuapp.com/odata/Customers?$filter=Oid eq ';

  // for menus
  MenuURL = 'http://serviceaksular.duloriaqrmenuapp.com/odata/Customers(';

  product: MProduct[];
  handleError: any;

  constructor(private http: HttpClient) {
  }

  getCustomerToCategory(id): Observable<MCustomer[]> {
    return this.http.get<MCustomer[]>(this.BaseURL + 'Customers?$filter=Oid eq ' + id + '&$expand=Menus($expand=Category)');
  }

  getCustomer(id): Observable<MCustomer[]> {
    return this.http.get<MCustomer[]>(this.CustLink + id);
  }

  getSlider(id): Observable<MSlider[]> {
    return this.http.get<MSlider[]>(this.SliderURL + id + ')/Slider');
  }

  getMenus(id): Observable<MMenu[]> {
    return this.http.get<MMenu[]>(this.MenuURL + id + ')/Menus');
  }

  getTable(id): Observable<MMenu[]> {
    return this.http.get<MMenu[]>(this.BaseURL + 'Table(' + id + ')');
  }


  getCategories(id): Observable<MMenu[]> {
    return this.http.get<MMenu[]>(this.BaseURL + 'Menus?$filter=Oid eq ' + id + '&$expand=Category');
  }

  getProduct(id): Observable<MProduct[]> {
    return this.http.get<MProduct[]>(this.BaseURL + 'Category(' + id + ')/Product?$expand=Image1');
  }

  getIngredients(id): Observable<MProduct[]> {
    return this.http.get<MProduct[]>(this.BaseURL + 'Product(' + id + ')/ProductProducts_IngredientIngredients?$expand=Ingredient');
  }

  findProduct(id): Observable<MProduct[]> {
    return this.http.get<MProduct[]>(this.BaseURL + 'Product?$filter=Oid eq ' + id);
  }

  postOrders(data: MOrders) {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<MOrders>(this.BaseURL + 'Orders', data, {headers}).toPromise();
  }

  postOrderMain(data: MOrderMain) {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<MOrderMain>(this.BaseURL + 'OrderMain', data, {headers}).toPromise();
  }

  postIngredient(data: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(this.BaseURL + 'OrdersOrderses_IngredientIngredients', data, {headers}).toPromise();
  }

}
