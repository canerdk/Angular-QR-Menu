import {Injectable} from '@angular/core';
import {MProduct} from "../Models/MProduct";
import {MMenu} from "../Models/MMenu";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  tasks: MProduct[];
  customer: MMenu[];
  language: MMenu[];

  constructor() {
  }

  getTasks() {
    if (localStorage.getItem('tasks') === null) {
      this.tasks = [];
    } else {
      this.tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    return this.tasks;
  }


  addTask(task: MProduct) {
    this.tasks.push(task);
    let tasks = [];
    if(localStorage.getItem('tasks') === null) {
      tasks = [];
      tasks.push(task);
      localStorage.setItem('tasks', JSON.stringify(tasks));
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
      tasks.push(task);
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }

  getCustomer() {
    if (localStorage.getItem('customer') === null) {
      this.customer = [];
    } else {
      this.customer = JSON.parse(localStorage.getItem('customer'));
    }
    return this.customer;
  }



  addCustomer(ct: MMenu) {
    this.customer.push(ct);
    let customer = [];
    if(localStorage.getItem('customer') === null) {
      customer = [];
      customer.push(ct);
      localStorage.setItem('customer', JSON.stringify(customer));
    } else {
      customer = JSON.parse(localStorage.getItem('customer'));
      localStorage.removeItem('tasks');//Menü dil değişimlerinde eğer sepette ürün varsa silinir.
      customer = [];
      customer.push(ct);
      localStorage.setItem('customer', JSON.stringify(customer));
    }
  }




  deleteTask(task: MProduct) {
    for (let i = 0; i < this.tasks.length; i++) {
      if (task == this.tasks[i]) {
        this.tasks.splice(i, 1);
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
      }
    }
  }


}
