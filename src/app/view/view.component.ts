import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  product:any = []

  constructor(private route:ActivatedRoute, private api:ApiService){}

  ngOnInit(): void {
    this.route.params.subscribe((result:any)=>{
      const {id} = result
      console.log(id);
      this.getProductDtails(id)
    })
  }

  getProductDtails(pid:any){
    this.api.viewProductAPI(pid).subscribe((result:any)=>{
      this.product = result
      console.log(result);
      
    })
  }
}
