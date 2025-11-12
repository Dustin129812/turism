import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { LoginService } from '../services/login-service';

export const loginGuard: CanActivateFn =async (route:ActivatedRouteSnapshot, state:RouterStateSnapshot) => {

  const router=inject(Router);
  const loginService=inject(LoginService);
  const data=await loginService.getToken();
  if(!data){
    router.navigate(['/tabs/tab1'])
    alert('No tienen acceso')
    return false;
  }

  return true;
};
