import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  serverUrl = "http://localhost:3000"

  constructor(private http:HttpClient) { }

  getAllProductsAPI(){
    return this.http.get(`${this.serverUrl}/all-products`)
  }
  viewProductAPI(id:any){
    return this.http.get(`${this.serverUrl}/${id}/view-product`)
  }
}
