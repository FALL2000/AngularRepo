import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Product } from '../models/product.model';
//import { threadId } from 'worker_threads';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit{

  public productId!:number;
  public productFormGroup!: FormGroup;

  constructor(private activeRoute: ActivatedRoute, private productService:ProductService, private fb: FormBuilder){

  }

  ngOnInit(){
    this.productId = this.activeRoute.snapshot.params['id'];
    this.productService.getProductById(this.productId)
    .subscribe({
      next: (product:any) => {
        this.productFormGroup = this.fb.group({
          id: this.fb.control(product.id),
          name: this.fb.control(product.name),
          price: this.fb.control(product.price),
          checked: this.fb.control(product.checked)
        })
      }
    })
  }

  updateProduct(){
    let product:Product = this.productFormGroup.value;
    this.productService.updateProduct(product)
    .subscribe({
      next: (data:any) => {

      }
    })
  }

}
