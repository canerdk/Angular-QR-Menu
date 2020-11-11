import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductComponent } from './Pages/product/product.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NgbAlertModule, NgbCarouselModule, NgbModule, NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {MaterialModule} from './Modules/material/material.module';
import {HttpClientModule} from '@angular/common/http';
import {Service} from './Services/service';
import { HomeComponent } from './Pages/home/home.component';
import { CategoryComponent } from './Pages/category/category.component';
import {FormsModule} from '@angular/forms';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import { CartComponent } from './Pages/cart/cart.component';
import { Dialog1Component } from './Dialogs/dialog1/dialog1.component';
import {ToastrModule} from 'ngx-toastr';
import { PaymentComponent } from './Pages/payment/payment.component';
import { Dialog2Component } from './Dialogs/dialog2/dialog2.component';
import { ProductdialogComponent } from './Dialogs/productdialog/productdialog.component';
import {OrderModule} from 'ngx-order-pipe';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    HomeComponent,
    CategoryComponent,
    CartComponent,
    Dialog1Component,
    PaymentComponent,
    Dialog2Component,
    ProductdialogComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        NgbModule,
        NgbPaginationModule,
        NgbAlertModule,
        NgbCarouselModule,
        MaterialModule,
        HttpClientModule,
        FormsModule,
        Ng2SearchPipeModule,
        ToastrModule.forRoot({
                timeOut: 2000,
                progressAnimation: 'increasing',
                preventDuplicates: true,
                positionClass: 'toast-top-full-width',
            }
        ),
        OrderModule
    ],
  providers: [
    Service
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
