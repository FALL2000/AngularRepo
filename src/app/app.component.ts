import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  actions: Array<any> = [
    {title:"Home", "route":"/home"},
    {title:"Products", "route":"/products"},
    {title:"New Product", "route":"/newProduct"}
  ];

  currentAction:any;

  setCurrentAction(action:any){
    this.currentAction = action;
  }

}
