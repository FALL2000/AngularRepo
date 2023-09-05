import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  public getProducts(keyword:string, page:number, size:number){
    return this.http.get("http://localhost:8089/products?name_like="+keyword+"&_page="+page+"&_limit="+size, {observe:"response"});
  }

  public checkProducts(product:Product){
    return this.http.patch<Product>("http://localhost:8089/products/"+product.id, {"checked":!product.checked});
  }

  public deleteProduct(product:Product){
    return this.http.delete("http://localhost:8089/products/"+product.id);
  }

  public saveProduct(product:Product){
    return this.http.post<Product>("http://localhost:8089/products/", product);
  }

  getProductById(productId:number){
    return this.http.get<Product>("http://localhost:8089/products/"+productId);
  }

  public updateProduct(product:Product){
    return this.http.put<Product>("http://localhost:8089/products/"+product.id, product);
  }
}
