import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MProduct} from "../../Models/MProduct";
import {MIngredient} from "../../Models/MIngredient";
import * as uuid from 'uuid';
import {TaskService} from "../../Services/task.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-productdialog',
  templateUrl: './productdialog.component.html',
  styleUrls: ['./productdialog.component.css']
})
export class ProductdialogComponent implements OnInit {

  product: any;
  ing: MIngredient;
  result: any;
  selectedFeatures: any = [];
  note: string;
  num: any = [];
  freeing: any = [];
  total: any = 0;
  qt: any = 1;
  free: any;
  price: any;

  constructor(
    public dialogRef: MatDialogRef<ProductdialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MProduct,
    private taskService: TaskService,
    private toastr: ToastrService) {
    this.product = data;
  }

  ngOnInit(): void {
    this.total = this.product.Price;
    this.free = this.product.Ingredient.filter(item => item.FreeOrNot === true);
    let ing = this.product.Ingredient;
    for (let i in ing){
      if (ing[i].Ingredient.FreeOrNot === false){
        this.freeing.push(ing[i].Ingredient);
      }
    }
    this.selectedFeatures = this.freeing; //başlangıçta free olan ürünleri changevalue methodundaki features a gönderdik.
  }



  onNoClick(): void {
    this.dialogRef.close();
  }

  addProduct(p){
    this.dialogRef.afterClosed().subscribe(result => {
      if (result){
       if (this.total === undefined){
         this.total = p.Price * p.Quantity;
       }
        let obj;
        obj = {
          Category: p.Category,
          Currency: p.Currency,
          Detail: p.Detail,
          Image: p.Image,
          Ingredient: this.selectedFeatures,
          Name: p.Name,
          Oid: uuid.v4(),
          Price: p.Price,
          Quantity: p.Quantity,
          TotalPrice: this.total,
          Note: this.note
        };
        this.taskService.addTask(obj);
        this.showToast(obj.Quantity, obj.Name);
      }
    });
    }
  quantity(q){
    this.qt = q;
    var sum = this.num.reduce((acc, cur) => acc + cur, 0);
    var ingtotal = this.qt * sum;
    var prototal = this.product.Price * this.qt;
    this.total = ingtotal + prototal;
  }

  checkValue(p: any, event: any) {
    this.ing = p.Ingredient;
    if (event.target.checked) {
      this.selectedFeatures.push(this.ing);
      if (this.ing.Price !== null) {
        this.num.push(parseFloat(this.ing.Price));
      }
    } else {
      const index: number = this.selectedFeatures.indexOf(this.ing);
      if (index !== -1) {
        this.selectedFeatures.splice(index, 1);
      }
      if (this.ing.Price !== null){
        const i: any = this.num.indexOf(parseFloat(this.ing.Price)); //indexi bulurken gelen değer mutlaka int olmalı
        if (i !== -1) {
          this.num.splice(i, 1);
        }
      }
    }

    var sum = this.num.reduce((acc, cur) => acc + cur, 0);
    var ingtotal = this.qt * sum;
    var prototal = this.product.Price * this.qt;
    this.total = ingtotal + prototal;
  }

  showToast(getQt, getName) {
    if (getQt === 1){
      var piece: string = "piece"
    }
    else{
      var piece: string = "pieces"
    }
    this.toastr.success(getQt + ' ' + piece + ' ' + getName + ' added.');
  }
}
