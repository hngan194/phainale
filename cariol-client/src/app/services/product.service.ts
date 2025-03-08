import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  colors: string[];
}


@Injectable({
  providedIn: 'root'
})


export class ProductService {
  private categories = [
        {name: 'Backpacks', 
          products: [
            { id: 1, name: 'Premium Canvas Backpack', price: 500000, image: 'assets/bag1.jpg', colors: ['#000', '#555'] },
            { id: 2, name: 'Backpack 2', price: 600000, image: 'assets/bag2.jpg', colors: ['#f00', '#ff0'] },
            { id: 3, name: 'Backpack 3', price: 700000, image: 'assets/bag3.jpg', colors: ['#00f', '#0ff'] },
            { id: 4, name: 'Backpack 4', price: 800000, image: 'assets/bag4.jpg', colors: ['#f0f', '#ff8800'] },
            { id: 5, name: 'Backpack 5', price: 900000, image: 'assets/bag5.jpg', colors: ['#123', '#456'] }
          ]
        },
        { name: 'Wallet', products: [
          { id: 6, name: 'Wallet 1', price: 300000, image: 'assets/wallet1.jpg', colors: ['#000', '#555'] },
          { id: 7, name: 'Wallet 2', price: 400000, image: 'assets/wallet2.jpg', colors: ['#f00', '#ff0'] },
          { id: 8, name: 'Wallet 3', price: 500000, image: 'assets/wallet3.jpg', colors: ['#00f', '#0ff'] },
          { id: 9, name: 'Wallet 4', price: 600000, image: 'assets/wallet4.jpg', colors: ['#f0f', '#ff8800'] },
          { id: 10, name: 'Wallet 5', price: 700000, image: 'assets/wallet5.jpg', colors: ['#123', '#456'] }
        ] },
        { name: 'Tote', products: [
          { id: 11, name: 'Tote 1', price: 700000, image: 'assets/tote1.jpg', colors: ['#000', '#555'] },
          { id: 12, name: 'Tote 2', price: 800000, image: 'assets/tote2.jpg', colors: ['#f00', '#ff0'] },
          { id: 13, name: 'Tote 3', price: 900000, image: 'assets/tote3.jpg', colors: ['#00f', '#0ff'] },
          { id: 14, name: 'Tote 4', price: 1000000, image: 'assets/tote4.jpg', colors: ['#f0f', '#ff8800'] },
          { id: 15, name: 'Tote 5', price: 1100000, image: 'assets/tote5.jpg', colors: ['#123', '#456'] }
        ] },
        { name: 'Accessories', products: [
          { id: 16, name: 'Accessories 1', price: 200000, image: 'assets/accessories1.jpg', colors: ['#000', '#555'] },
          { id: 17, name: 'Accessories 2', price: 300000, image: 'assets/accessories2.jpg', colors: ['#f00', '#ff0'] },
          { id: 18, name: 'Accessories 3', price: 400000, image: 'assets/accessories3.jpg', colors: ['#00f', '#0ff'] },
          { id: 19, name: 'Accessories 4', price: 500000, image: 'assets/accessories4.jpg', colors: ['#f0f', '#ff8800'] },
          { id: 20, name: 'Accessories 5', price: 600000, image: 'assets/accessories5.jpg', colors: ['#123', '#456'] }
        ] },
        { name: 'Crossbag', products: [
          { id: 21, name: 'Crossbag 1', price: 400000, image: 'assets/crossbag1.jpg', colors: ['#000', '#555'] },
          { id: 22, name: 'Crossbag 2', price: 500000, image: 'assets/crossbag2.jpg', colors: ['#f00', '#ff0'] },
          { id: 23, name: 'Crossbag 3', price: 600000, image: 'assets/crossbag3.jpg', colors: ['#00f', '#0ff'] },
          { id: 24, name: 'Crossbag 4', price: 700000, image: 'assets/crossbag4.jpg', colors: ['#f0f', '#ff8800'] },
          { id: 25, name: 'Crossbag 5', price: 800000, image: 'assets/crossbag5.jpg', colors: ['#123', '#456'] }
        ] }
  ];
  getProducts() {
    return this.categories.flatMap(category => category.products);
  }
  

  getCategoriesWithProducts() {
    return this.categories;
  }

  getProductById(id: number): Observable<Product | null> {
    for (let category of this.categories) {
      const product = category.products.find(p => p.id === id);
      if (product) return of(product); // Trả về Observable
    }
    return of(null);
  }
  constructor() { }
}
