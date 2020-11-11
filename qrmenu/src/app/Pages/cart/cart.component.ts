import {Component, OnInit} from '@angular/core';
import {MProduct} from "../../Models/MProduct";
import {ActivatedRoute, Router} from "@angular/router";
import {Service} from "../../Services/service";
import {Subject} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {Dialog1Component} from "../../Dialogs/dialog1/dialog1.component";
import {PageEvent} from "@angular/material/paginator";
import {TaskService} from "../../Services/task.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  Product: any = [];
  totalPrice: any = 0;
  currency: string;
  quantity: number = 0;
  selectedOpt: string;
  totalProductPrice: number = 0;
  note: string = "";
  prices: any = [];
  home: any;
  isCheck: any = true;

  constructor(public dialog: MatDialog,
              private route: Router) {
  }

  ngOnInit(): void {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;
    var cart = JSON.parse(localStorage.getItem('tasks'));
    this.Product = cart;
    if (cart != null) {
      for (let i in this.Product) {
        this.prices.push(parseFloat(this.Product[i].TotalPrice));
        this.currency = this.Product[i].Currency;
      }
      var sum = this.prices.reduce((acc, cur) => acc + cur, 0);
      this.totalPrice = sum;
    }
    this.home = localStorage.getItem('homelink');
  }


  changeValue(q: MProduct) {
    const productExistInCart = this.Product.find(({Oid}) => Oid === q.Oid);
    let num = q.Quantity;
    if (productExistInCart) {
      // Eğer kartta aynı idye sahip ürün varsa buraya girildi ve localstore daki ürünler çağırıldı.
      var productFromLocalStorage = JSON.parse(localStorage.getItem("tasks"));
      for (var i in productFromLocalStorage) {
        //Localstore daki ürün ile gönderdiğimiz ürünün id si eşitse ürün adetine +1 ekledik.
        if (productExistInCart.Oid == productFromLocalStorage[i].Oid) {
          productFromLocalStorage[i].Quantity = num;
          this.totalProductPrice = productFromLocalStorage[i].Quantity * productFromLocalStorage[i].Price;
          productFromLocalStorage[i].TotalPrice = this.totalProductPrice;
          localStorage.setItem('tasks', JSON.stringify(productFromLocalStorage));
          if (productFromLocalStorage[i].Quantity == 0) {
            //Seçilen ürünün adeti 0 a inerse buraya girdik.
            const dialogRef = this.dialog.open(Dialog1Component);
            dialogRef.afterClosed().subscribe(result => {
              console.log(`Dialog result: ${result}`);
              if (result == true) {
                //Burada ürün 0 a inip onaylanırsa ürün silinir.
                productFromLocalStorage.splice(i, 1);
                localStorage.setItem('tasks', JSON.stringify(productFromLocalStorage));
                this.ngOnInit();
              }
            });
            break;
          }
          this.Product = localStorage.setItem("tasks", JSON.stringify(productFromLocalStorage));
          break;
        }
      }
      this.ngOnInit();
    }

  }


  payment(){
    if (this.selectedOpt == null){
      alert("Please select payment method.");
    }
    localStorage.setItem('note',this.note);
    this.route.navigate(['payment', this.selectedOpt]);

  }

  deleteCart() {
    const dialogRef = this.dialog.open(Dialog1Component);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if (result == true) {
        localStorage.removeItem('tasks');
        var cart = JSON.parse(localStorage.getItem('tasks'));
        this.Product = cart;
        this.totalPrice = 0;
        this.ngOnInit()
      }
    });
  }

}
