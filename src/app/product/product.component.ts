import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { InventoryService } from '../inventory.service';
import { Product } from '../model/product.model';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit, OnDestroy {
  products: Product | any;
  productSub: Subscription | any;
  constructor(
    private inventoryservice: InventoryService,
    private sharedservice: SharedService,
    private router: Router,
    private loader: NgxUiLoaderService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getProductList();
  }

  getProductList() {
    this.loader.start();
    this.productSub = this.inventoryservice.getProduct().subscribe(
      (res) => {
        this.products = res;
        this.loader.stop();
      },
      (err) => {
        console.log(err);
        this.loader.stop();
      },
      () => {}
    );
  }

  editProduct(product: Product) {
    this.sharedservice.geteditProduct(product);
    this.router.navigate(['/edit']);
  }

  deleteProduct(product: Product) {
    this.loader.start();
    this.productSub = this.inventoryservice.deleteSelectedProduct(product).subscribe((res) => {
      console.log('Product Deleted Successfully');
      this.toastr.success('Product Deleted Successfully');
      this.loader.stop();
      this.getProductList();
    }, err => {
      console.log(err);
      this.toastr.error(err.message);
      this.loader.stop();
    }, () => {

    });
  }

  ngOnDestroy() {
    this.productSub.unsubscribe();
  }
}
