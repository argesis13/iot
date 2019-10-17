import {Injectable} from '@angular/core';
import {CanLoad, Route, Router, UrlSegment} from '@angular/router';
import {Observable, of} from 'rxjs';
import {UserData} from '../../providers/user-data';
import {switchMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor(public userData: UserData,
              private router: Router) {

  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    console.log('can load auth guard ');

    return this.userData.isLoggedIn().then(res => {
      if (!res) {
        this.router.navigateByUrl('/login');
      }
      return res;
    });
  }
}
