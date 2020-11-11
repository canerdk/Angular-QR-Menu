import {Component, OnInit} from '@angular/core';
import {MCustomer} from '../../Models/MCustomer';
import {MSlider} from '../../Models/MSlider';
import {MMenu} from '../../Models/MMenu';
import {Service} from '../../Services/service';
import {ActivatedRoute, Router} from '@angular/router';
import {TaskService} from '../../Services/task.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  Customer: MCustomer[];
  Sliders: MSlider[];
  Menus: MMenu[];
  selectedId: string;
  shareLink: string;
  selectedTable: string;

  /*customOptions: OwlOptions = {
    loop: true,
    autoplay:true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    lazyLoad: true,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      }
    },
    nav: false
  }*/


  constructor(
    private service: Service,
    private route: ActivatedRoute,
    private router: Router,
    private ctService: TaskService,
    private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {
    //Get id from url
    this.route.paramMap.subscribe(params => {
      let id = params.get('id');
      this.selectedId = id;
    });
    this.route.paramMap.subscribe(params => {
      let tableid = params.get('tableid');
      this.selectedTable = tableid;
    });
    localStorage.setItem('table', this.selectedTable);


    // Get share link
    this.shareLink = 'http://menuaksular.duloriaqrmenuapp.com/home/' + this.selectedId + '/' + this.selectedTable;
    const link = '/home/' + this.selectedId + '/' + this.selectedTable;
    localStorage.setItem('homelink', link);
    // sent id to service
    this.service.getCustomer(this.selectedId).subscribe(data => {
        this.Customer = data['value'];
      },
      error => {
        console.log(error);
      });

    /*this.service.getSlider(this.selectedId).subscribe(data => {
        this.Sliders = data['value'];
      },
      error => {
        console.log(error);
      });*/

    this.service.getMenus(this.selectedId).subscribe(data => {
        this.Menus = data['value'];
      },
      error => {
        console.log(error);
      });

    this.Menus = this.ctService.getCustomer();

  }

  showToast() {
    this.toastr.success('Copied menu link.');
  }

  onClick(c) {
    this.router.navigate(['category', c.Oid]);
    this.ctService.addCustomer(c);
  }

}
