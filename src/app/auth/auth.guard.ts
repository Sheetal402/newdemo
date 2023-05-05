import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanDeactivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TaskService } from 'app/task.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private taskService: TaskService, private router: Router) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):boolean {
      console.log(555,this.taskService.isLoggedIn());
      
      if(!this.taskService.isLoggedIn()){
        this.router.navigateByUrl('/login');
        this.taskService.deleteToken();
        return false;
      }
      console.log(999,this.taskService.isLoggedIn());
      return true;
  }
}
