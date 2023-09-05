import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {

  productState:any = {
   products: [],
   keyword: "",
   totalPages: 0,
   pageSize: 3,
   currentPage: 1,
   totalProducts: 0
  }

  constructor() { }
}
