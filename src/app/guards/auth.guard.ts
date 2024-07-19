import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = () => {

  const authService = inject(AuthService)
  const toaster = inject(ToastrService)
  const router = inject(Router)

  if (authService.isLoggedIn()) {
    return true
  }else{
    toaster.warning("Please login")
    router.navigateByUrl("/login")
    return false
  }
};
