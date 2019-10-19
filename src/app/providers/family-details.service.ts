import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {UserModel} from '../interfaces/user-model';
import {EnvService} from "./env.service";

@Injectable({
  providedIn: 'root'
})
export class FamilyDetailsService {

  constructor(private http: HttpClient, private env: EnvService) {

  }

  public getFamily (username: String): Observable<any> {
    return this.http.get(this.env.url + 'users/' + username + '/family' );
  }

  public getFamilyNumber(username: String): Observable<any> {
    return this.http.get(this.env.url + 'users/' + username + '/family' ).pipe(
      map(res => {
        const members = res['members'] as [];
        console.log(members.length);
        return members.length;
      })
    );
  }

  public searchMember(username: string, queryText: string): Observable<any> {
    return this.http.get(this.env.url + 'users/' + username + '/search?username=' + queryText);
  }

  public addFamilyMember(username: string, member: UserModel) {
    const memberUsername = [member.username];
    // const requestBody = JSON.stringify(memberUsername);
    return this.http.put(this.env.url + 'users/' + username + '/family/add', memberUsername);
  }

  public removeFamilyMember(username: string, member: string): Observable<any> {
    return this.http.delete(this.env.url + 'users/' + username + '/family/' + member);
  }

  public createFamily(username: string, familyId: string): Observable<any> {
    const request = {
      id : familyId
    };
    return this.http.post(this.env.url + 'users/' + username + '/family', request);
  }

}
