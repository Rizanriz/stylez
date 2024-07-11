  import { Component } from '@angular/core';
  import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

  @Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
  })
  export class RegisterComponent {

    registerForm = this.fb.group({
      username:['',[Validators.pattern('[a-zA-Z ]*'),Validators.required]],
      email:['',[Validators.email,Validators.required]],
      password:['',[Validators.pattern('[a-zA-Z0-9]*'),Validators.required]],
    })

    constructor(private fb:FormBuilder, private toastr:ToastrService){}

    register(){
      if (this.registerForm.valid) {
        
      }else{
        this.toastr.warning("Invalid form")
      }
    }
  }
