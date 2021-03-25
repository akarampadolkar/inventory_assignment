import { Injectable } from '@angular/core';
import { Product } from './model/product.model';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  editProduct: Product | any;
  geteditProduct(product: Product){
    this.editProduct = product;
  }

  geteditedProduct(){
    return this.editProduct;
  }
}
