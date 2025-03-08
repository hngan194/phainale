import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService } from '../_services/categories.service';
import { Product } from '../_models/product';
import { HomepageService } from '../_services/homepage.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.html',
  styleUrls: ['./categories.css']
})
export class CategoriesComponent implements OnInit {
  products: Product[] = [];
  idObject: string | null = null;
  selectedCode: any
  categories: any[] = [];

  constructor(private route: ActivatedRoute, private _cservice: CategoriesService, private _service: HomepageService, private _router: Router) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((param) => {
      this.idObject = param.get('_id');
      if (this.idObject) {
        this._cservice.getProductsByCategoryId(this.idObject).subscribe((data: any) => {
          this.products = data.filter((product: any) => {
            if (typeof product.categoryId === 'object' && product.categoryId) {
              return product.categoryId === this.idObject;
            }
            return product.categoryId === this.idObject;
          });

          console.log('Filtered Products:', this.products);
        });
      }
    });

    this._cservice.getCategories().subscribe({
      next: (data) => { this.categories = data },
      error: (err) => { console.log(err) }
    }); 

    this.route.paramMap.subscribe((params) => {
      let code = params.get("_id");
      console.log('Category ID:', code);
      if (code != null){
        this.selectedCode = code
      }
   })

  }
  someFunction(productId: any): void {
    this._router.navigate(["/products", productId._id]);
   } 

   someFunction1(categorieId: any): void {
    this._router.navigate(["/categories", categorieId._id]);
   }
}