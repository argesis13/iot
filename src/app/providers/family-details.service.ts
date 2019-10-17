import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {UserModel} from '../interfaces/user-model';

@Injectable({
  providedIn: 'root'
})
export class FamilyDetailsService {

  constructor(private http: HttpClient) {

  }

  public getFamily (username: String): Observable<any> {
    return this.http.get('http://localhost:8282/users/' + username + '/family' );
  }

  public getFamilyNumber(username: String): Observable<any> {
    return this.http.get('http://localhost:8282/users/' + username + '/family' ).pipe(
      map(res => {
        const members = res['members'] as [];
        console.log(members.length);
        return members.length;
      })
    );
  }

  public searchMember(username: String): Observable<any> {
    return this.http.get('http://localhost:8282/users/search?username=' + username);
  }

  public addFamilyMember(username: string, member: UserModel) {
    const memberUsername = [member.username];
    // const requestBody = JSON.stringify(memberUsername);
    return this.http.put('http://localhost:8282/users/' + username + '/family/add', memberUsername);
  }

}
