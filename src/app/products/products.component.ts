import { Component, OnInit } from '@angular/core';
//import { HttpClient } from '@angular/common/http';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';
import { Router } from '@angular/router';
import { AppStateService } from '../services/app-state.service';
//import { Observable } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {



  constructor(private productService:ProductService, private router:Router, public appStateService: AppStateService){

  }

  ngOnInit(){
    this.getProducts();
  }

  getProducts(){
    this.productService.getProducts(this.appStateService.productState.keyword,this.appStateService.productState.currentPage, this.appStateService.productState.pageSize)
     .subscribe({
      next : (resp:any) => {
        this.appStateService.productState.products = resp.body as Product[];
        let totalProducts: number = parseInt(resp.headers.get('x-total-count'));
        this.appStateService.productState.totalProducts = totalProducts;
        this.appStateService.productState.totalPages = Math.floor(totalProducts / this.appStateService.productState.pageSize);
        if(totalProducts % this.appStateService.productState.pageSize != 0){
          this.appStateService.productState.totalPages = this.appStateService.productState.totalPages + 1;
        }
      },
      error: (err:any) => {
        console.log(err);
      }
    });
  }

  handleCheckProduct(product:Product){
    this.productService.checkProducts(product)
    .subscribe({
       next: () => {
        product.checked = !product.checked;
       }
    })
  }

  handleDelete(product:Product){
    if(confirm("Voulez vous vraiment supprimer?"))
      this.productService.deleteProduct(product)
      .subscribe({
        next: () => {
          this.appStateService.productState.products = this.appStateService.productState.products.filter((p:any) => p.id != product.id);
        }
      })
  }

  handleEdit(product:Product){
    this.router.navigateByUrl("/editProduct/"+product.id)
  }


  handleGoToPage(page:number){
    this.appStateService.productState.currentPage = page;
    this.getProducts();
  }
}
