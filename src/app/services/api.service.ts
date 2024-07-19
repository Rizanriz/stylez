import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  wishlistCount = new BehaviorSubject(0)
  CartCount = new BehaviorSubject(0)
  searchKey = new BehaviorSubject("")

  serverUrl = "https://stylez-server.onrender.com"

  constructor(private http: HttpClient) {
    if (sessionStorage.getItem('token')) {
      this.getWishlistCount()
    }
  }

  getWishlistCount() {
    this.getWishlistApi().subscribe((result: any) => { //wishlist count
      this.wishlistCount.next(result.length)
    })
  }

  getCartCount() {
    this.getCartApi().subscribe((result: any) => {  //cart count
      this.CartCount.next(result.length)
    })
  }


  getAllProductsAPI() {
    return this.http.get(`${this.serverUrl}/all-products`)
  }
  viewProductAPI(id: any) {
    return this.http.get(`${this.serverUrl}/${id}/view-product`)
  }
  registerApi(user: any) {
    return this.http.post(`${this.serverUrl}/register`, user)
  }
  loginApi(user: any) {
    return this.http.post(`${this.serverUrl}/login`, user)
  }

  //append token to http header
  appendToken = () => {
    const token = sessionStorage.getItem("token")
    let headers = new HttpHeaders()
    if (token) {
      headers = headers.append("Authorization", `Bearer ${token}`)
    }
    return { headers }
  }
  addToWishlistApi(product: any) {
    return this.http.post(`${this.serverUrl}/wishlist`, product, this.appendToken())
  }
  getWishlistApi() {
    return this.http.get(`${this.serverUrl}/getWishlist`, this.appendToken())
  }
  removeWishlistApi(id: any) {
    return this.http.delete(`${this.serverUrl}/wishlist/${id}/remove`, this.appendToken())
  }


  //cart
  addToCartApi(product: any) {
    return this.http.post(`${this.serverUrl}/addToCart`, product, this.appendToken())
  }
  getCartApi() {
    return this.http.get(`${this.serverUrl}/getCart`, this.appendToken())
  }
  removeCartApi(id: any) {
    return this.http.delete(`${this.serverUrl}/cart/${id}/remove`, this.appendToken())
  }
  incrementCaretApi(id:any){
    return this.http.get(`${this.serverUrl}/cart/${id}/increment`, this.appendToken())
  }
  decrementCaretApi(id:any){
    return this.http.get(`${this.serverUrl}/cart/${id}/decrement`, this.appendToken())
  }
  emptyCartApi(){
    return this.http.delete(`${this.serverUrl}/empty-cart`, this.appendToken())
  }
  
}
