import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  product:any = []

  constructor(private route:ActivatedRoute, private api:ApiService,private toastr:ToastrService){}

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

  addToWishlist(product:any){
    if (sessionStorage.getItem("token")) {
      this.api.addToWishlistApi(product).subscribe({
        next:(result:any)=>{
          this.toastr.success(`product ${result.title} added to wishlist`)
          this.api.getWishlistCount()
        },error:(reason:any)=>{
          console.log(reason);
          this.toastr.warning(reason.error);
          
        }
      })
    }else{
      this.toastr.info("Please login")
    }
  }

  addToCart(product:any ){
    if (sessionStorage.getItem("token")) {
      product.quantity = 1
      this.api.addToCartApi(product).subscribe({
        next:(result:any)=>{
            this.toastr.success(result)
            this.api.getCartCount()
        },error:(reason:any)=>{
          this.toastr.warning(reason.error)
        }
      })
    }else{
      this.toastr.info("Please login")
    }
  }
}
