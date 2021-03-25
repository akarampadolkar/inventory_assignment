import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { InventoryService } from '../inventory.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit, OnDestroy {

  addSub: Subscription | any;
  constructor(
    private inventoryservice: InventoryService,
    private router: Router,
    private loader: NgxUiLoaderService,
    private toastr: ToastrService) { }

    addProduct = new FormGroup({
      name: new FormControl(''),
      description: new FormControl(''),
      imgUrl: new FormControl(''),
      rating: new FormControl(''),
      price: new FormControl('')
    });

  ngOnInit(): void {
  }

  onAdd(){
    this.loader.start();
    this.addSub = this.inventoryservice.addProduct(this.addProduct.value).subscribe(res => {
     // console.log('Proudct Added Successfully', res);
      this.toastr.success('Proudct Added Successfully');
      this.addProduct.reset();
      this.router.navigate(['/']);
      this.loader.stop();
    }, err => {
      console.log(err);
      this.toastr.error(err.message);
      this.loader.stop();
    }, () => {

    });
  }

  ngOnDestroy(){
    this.addSub.unsubscribe();
  }

}
