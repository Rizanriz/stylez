import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{

  allProducts:any = []
  cartTotalPrice:number = 0
  couponStatus:boolean = false
  couponClickStaus:boolean = false

  constructor(private api:ApiService,private router:Router){}

  ngOnInit(): void {
    if (sessionStorage.getItem("token")) {
      this.getCartItems()
    }
  }

  getCoupon(){
    this.couponStatus = true
  }
  backToOfferce(){
    this.couponStatus = true
  }
  coupon5percent(){
    this.couponClickStaus = true
    let discount = Math.ceil(this.cartTotalPrice*.05)
    this.cartTotalPrice -= discount
  }
  coupon20percent(){
    this.couponClickStaus = true
    let discount = Math.ceil(this.cartTotalPrice*0.2)
    this.cartTotalPrice -= discount
  }
  coupon50percent(){
    this.couponClickStaus = true
    let discount = Math.ceil(this.cartTotalPrice*0.5)
    this.cartTotalPrice -= discount
  }

  checkout(){
    sessionStorage.setItem("total", JSON.stringify(this.cartTotalPrice))
    this.router.navigateByUrl("/checkout")
  }

  getCartItems(){
    this.api.getCartApi().subscribe((res:any)=>{
      this.allProducts = res
      this.getTotalPrice()
    })
  }

  getTotalPrice(){
    this.cartTotalPrice = Math.ceil(this.allProducts.map((item:any)=>item.totalPrice)
    .reduce((p1:any,p2:any)=>p1+p2))
  }

  removeItem(id:any){
      this.api.removeCartApi(id).subscribe((res:any)=>{
        this.getCartItems()
        this.api.getCartCount()
      })
  }

  increamentQuantity(id:any){
    this.api.incrementCaretApi(id).subscribe((res:any)=>{
      this.getCartItems()
    })
  }
  decrementQuantity(id:any){
    this.api.decrementCaretApi(id).subscribe((res:any)=>{
      this.getCartItems()
    })
  }
  emptyCart(){
    this.api.emptyCartApi().subscribe((res:any)=>{
      this.getCartItems()
      this.api.getCartCount() 
    })
  }
}
