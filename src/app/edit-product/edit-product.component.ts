import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { InventoryService } from '../inventory.service';
import { Product } from '../model/product.model';
import { SharedService } from '../shared.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  editedProduct: Product | any;
  constructor(
    private sharedservice: SharedService,
    private inventoryservice: InventoryService,
    private router: Router,
    private loader: NgxUiLoaderService,
    private toastr: ToastrService) { }
  editProduct = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    imgUrl: new FormControl(''),
    rating: new FormControl(''),
    price: new FormControl('')
  });

  ngOnInit(): void {
    this.editedProduct = this.sharedservice.geteditedProduct();
    this.editProduct.patchValue({
      name: this.editedProduct.name,
      description: this.editedProduct.description,
      imgUrl: this.editedProduct.imgUrl,
      rating: this.editedProduct.rating,
      price: this.editedProduct.price
    });
  }

  onEdit(){
    this.loader.start();
    this.inventoryservice.updateProduct(this.editProduct.value, this.editedProduct.id).subscribe(res => {
      this.toastr.success('Product Updated Successfully');
      this.editProduct.reset();
      this.router.navigate(['/']);
      this.loader.stop();
    }, err => {
      console.log(err);
      this.toastr.error(err.message);
      this.loader.stop();
    }, () => {

    });
  }

}
