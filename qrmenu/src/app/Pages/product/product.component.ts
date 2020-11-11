import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {NgbCarouselConfig} from "@ng-bootstrap/ng-bootstrap";
import {Service} from "../../Services/service";
import {ActivatedRoute, Router} from "@angular/router";
import {MProduct} from "../../Models/MProduct";
import {TaskService} from "../../Services/task.service";
import {MCategories} from "../../Models/MCategories";
import {ToastrService} from "ngx-toastr";
import {MatDialog} from "@angular/material/dialog";
import {Dialog1Component} from "../../Dialogs/dialog1/dialog1.component";
import {ProductdialogComponent} from "../../Dialogs/productdialog/productdialog.component";


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  Product: any;
  selectedId: string;
  searchText: string;
  cart: any = [];
  tasks: MProduct[];
  num: number = 0;
  totalPrice: number;
  Ingredients: any;

  constructor(
    private service: Service,
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService,
    private toastr: ToastrService,
    public dialog: MatDialog
  ) {
  }

  /*constructor(config: NgbCarouselConfig) {
    config.interval = 2000;
    config.wrap = true;
  }*/

  ngOnInit(): void {
    //Get id from url
    this.route.paramMap.subscribe(params => {
      let id = params.get('id');
      this.selectedId = id
    });

    //sent id to service
    this.service.getProduct(this.selectedId).subscribe(data => {
        this.Product = data['value'];
      },
      error => {
        console.log(error);
      });

    this.tasks = this.taskService.getTasks();


  }

  ngOnChanges(): void {
    this.tasks = this.taskService.getTasks();
  }


  addTask(task: MProduct) {
    this.service.getIngredients(task.Oid).subscribe((data) => {
      this.Ingredients = data['value'];
      const dialogRef = this.dialog.open(ProductdialogComponent, {
        minWidth: 350,
        data: {
          Oid: task.Oid,
          Category: task.Category,
          Image: null,
          Name: task.Name,
          Detail: task.Detail,
          Price: task.Price,
          Currency: task.Currency,
          Quantity: 1,
          Ingredient: this.Ingredients
        }
      });
      /*dialogRef.afterClosed().subscribe(result => {
        console.log(result);
        if (result) {
          this.taskService.addTask(result);
        }else{
          console.log("Ürün yok!");
        }

      });*/
    });


    /*let Qt: number = 1;
    let pName: string;
    let pId = parseInt(task.Price);
    pName = task.Name;
    var customerFromLocalStorage = JSON.parse(localStorage.getItem("customer"));
    var customerId = customerFromLocalStorage[0].Customers;

    //Burada gönderilen ürün idsi ile karttaki ürünün idsinin aynı olup olmadığına bakıldı.
    const productExistInCart = this.tasks.find(({Oid}) => Oid === task.Oid);
    if (productExistInCart) {
      // Eğer kartta aynı idye sahip ürün varsa buraya girildi ve localstore daki ürünler çağırıldı.
      var productFromLocalStorage = JSON.parse(localStorage.getItem("tasks"));

      for (var i in productFromLocalStorage){
        //Localstore daki ürün ile gönderdiğimiz ürünün id si eşitse ürün adetine +1 ekledik.
        if (productExistInCart.Oid == productFromLocalStorage[i].Oid){
          productFromLocalStorage[i].Quantity += 1;
          this.totalPrice = productFromLocalStorage[i].Quantity * productFromLocalStorage[i].Price;
          productFromLocalStorage[i].TotalPrice = this.totalPrice;
          localStorage.setItem("tasks",JSON.stringify(productFromLocalStorage));
          Qt = productFromLocalStorage[i].Quantity;
          pName = productFromLocalStorage[i].Name;
          break;
        }
      }
    } else {
      this.taskService.addTask({...task, Quantity:1, TotalPrice:pId, Customer: customerId});
    }
    this.showToast(Qt, pName);
    this.ngOnChanges();*/
  }

 /* showToast(getQt, getName) {
    this.toastr.success(getQt + ' adet ' + getName + ' eklendi.');
  }*/


  deleteTask(task: MProduct) {
    const dialogRef = this.dialog.open(Dialog1Component);
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.taskService.deleteTask(task);
      }
    });
  }


}
