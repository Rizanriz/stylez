import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  allProducts:any = [] //to hold all products

  constructor(private api:ApiService){}

  ngOnInit(): void {
      this.api.getAllProductsAPI().subscribe((result:any)=>{
        this.allProducts = result
        console.log(result);
        
      })
  }
}
