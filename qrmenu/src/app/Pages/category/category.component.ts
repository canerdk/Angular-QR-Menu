import {Component, OnInit} from '@angular/core';
import {Service} from '../../Services/service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  Menus: any;
  selectedId: string;
  searchText: string;

  constructor(
    private service: Service,
    private route: ActivatedRoute,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    //Get id from url
    this.route.paramMap.subscribe(params => {
      let id = params.get('id');
      this.selectedId = id
    });

    //sent id to service
    this.service.getCategories(this.selectedId).subscribe(data => {
        this.Menus = data['value'];
      },
      error => {
        console.log(error);
      });
  }

  getProduct(p) {
    this.router.navigate(['product', p.Oid]);
  }

}
