import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Service} from '../../Services/service';
import * as uuid from 'uuid';
import {ToastrService} from 'ngx-toastr';
import {MatDialog} from '@angular/material/dialog';
import {Dialog2Component} from '../../Dialogs/dialog2/dialog2.component';
import {formatDate} from '@angular/common';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  Product: any = [];
  totalPrice: any = 0;
  currency: string;
  selectedData: string;
  language: any;
  currentDate: string;
  order: any;
  sentobj: any = [];
  result: any;
  table: any;
  prices: any = [];
  orderid: any;
  home: any;

  constructor(
    private route: ActivatedRoute,
    private service: Service,
    private toastr: ToastrService,
    public dialog: MatDialog
  ) {

  }

  ngOnInit(): void {
    // Get id from url
    this.route.paramMap.subscribe(params => {
      const data = params.get('data');
      this.selectedData = data;
    });
    this.getCartTotal();
    const custOid = JSON.parse(localStorage.getItem('customer'));
    const currentTable = localStorage.getItem('table');
    this.home = localStorage.getItem('homelink');
  }


  getCartTotal() {
    const cart = JSON.parse(localStorage.getItem('tasks'));
    this.Product = cart;
    if (cart != null) {
      for (const i in this.Product) {
        this.prices.push(parseFloat(this.Product[i].TotalPrice));
        this.currency = this.Product[i].Currency;
      }
      const sum = this.prices.reduce((acc, cur) => acc + cur, 0);
      this.totalPrice = sum;
    }
  }
  pay() {
    const cart = JSON.parse(localStorage.getItem('tasks'));
    const currentTable = localStorage.getItem('table');
    this.currentDate = formatDate(new Date(), 'yyyy/MM/dd HH:mm:ss', 'en');
    // let currentTime = formatDate(new Date(), 'HH:mm:ss', 'en');
    const custOid = JSON.parse(localStorage.getItem('customer'));
    const dialogRef = this.dialog.open(Dialog2Component);
    const note = localStorage.getItem('note');
    this.service.getTable(currentTable).subscribe(data => {
      this.table = data;
      dialogRef.afterClosed().subscribe(result => {
        if (result === true) {
          const mainOrder = {
            Oid: uuid.v4(),
            Name: this.table.Name,
            Date: this.currentDate,
            Table: currentTable,
            Customers: custOid[0].Customers,
            PaymentState: 0,
            PrepareState: 0,
            Note: note,
            Confirmation: false,
            Complete: false
          };
          this.service.postOrderMain(mainOrder).then((res) => {
            this.order = res;
            if (cart) {
              for (const i in cart) {
                const obj: any = cart[i].Ingredient; // cart ın içindeki ingredient arrayına ulaşmak için for ile dönüp ing objesine atadık.
                const mycardobj = {
                  /*Burada kaç tane obje gelirse hepsini tek tek veritabanına gönderdik.
                  * Dikkat edilmesi gereken; gönderilen değer türü ile hem servis hem de veritabanındaki değer türü aynı olacak
                  * ve eğer association bir id gönderiyorsak o id nin veritabanında ilgili alanda daha önce kayıtlı olması gerekir.*/
                  Oid: uuid.v4(),
                  Name: cart[i].Name,
                  Detail: cart[i].Detail,
                  Price: cart[i].Price,
                  Currency: cart[i].Currency.toString(),
                  Quantity: cart[i].Quantity,
                  TotalPrice: cart[i].TotalPrice.toString(),
                  Note: cart[i].Note,
                  PaymentMethod: this.selectedData,
                  Date: this.currentDate,
                  OrderMain: this.order.Oid
                };
                this.service.postOrders(mycardobj).then((res) => {
                  this.result = res;
                  for (const a in obj) {
                    const ing = {
                      OID: uuid.v4(),
                      Ingredients: obj[a].Oid, // ürünün içerikleri array olarak geldiği için ürünün içeriklerini kendi içinde döndük
                      Orderses: this.result.Oid // Ürün tek olduğu için sadece id gönderdik
                    };
                    this.service.postIngredient(ing);
                  }
                });
              }

              this.showToast();
              localStorage.removeItem('tasks');
              // localStorage.removeItem('table');
              localStorage.removeItem('note');
              this.totalPrice = 0;
              this.ngOnInit();

            }
          });
        }
      });
    });


  }

  showToast() {
    this.toastr.success('Orders has been sent successfully, thank you.');
  }
}
