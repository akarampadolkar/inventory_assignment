import { Injectable } from '@angular/core';
import { Product } from './model/product.model';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor(private http: HttpClient) { }

  private getProductUrl = 'http://localhost:3000/product';

  getProduct() {
     return this.http.get(this.getProductUrl);
  }

  addProduct(addedProduct: Product){
    console.log(addedProduct)
    return this.http.post(this.getProductUrl, addedProduct);
  }

  updateProduct(updatedProduct: Product, id: any){
    return this.http.put(this.getProductUrl + '/' + id, updatedProduct);
  }

  deleteSelectedProduct(deletedProduct: Product) {
   return this.http.delete(this.getProductUrl + '/' + deletedProduct.id);
  }

}
