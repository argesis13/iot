import { Injectable } from '@angular/core';
import { Events } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {UserModel} from "../interfaces/user-model";
import {UserOptions} from "../interfaces/user-options";
import {EnvService} from "./env.service";


@Injectable({
  providedIn: 'root'
})
export class UserData {
  _favorites: string[] = [];
  HAS_LOGGED_IN = 'hasLoggedIn';

  constructor(
    public events: Events,
    public storage: Storage,
    private http: HttpClient,
    private env: EnvService
  ) { }

  hasFavorite(sessionName: string): boolean {
    return (this._favorites.indexOf(sessionName) > -1);
  }

  addFavorite(sessionName: string): void {
    this._favorites.push(sessionName);
  }

  removeFavorite(sessionName: string): void {
    const index = this._favorites.indexOf(sessionName);
    if (index > -1) {
      this._favorites.splice(index, 1);
    }
  }

  login(username: string): Promise<any> {
    console.log(this.env.url);
    return this.http.get(this.env.url + 'users/' + username).pipe(
      map(response => {
          if (response['username'] === username) {
            return this.storage.set(this.HAS_LOGGED_IN, true).then(() => {
              return this.setUsername(username).then(() => {
                console.log('response' + response['familyId']);
                if(response['familyId'] != null || response['familyId'] != undefined) {
                   this.setFamilyId(response['familyId']);
                }
                return this.events.publish('user:login');
              });
            });
          } else {
            return this.storage.set(this.HAS_LOGGED_IN, false);
          }
        }
      )
    ).toPromise();
  }

  signup(user: UserOptions): Observable<any> {
    return this.http.post(this.env.url + 'users/', user).pipe(
      map(res => {
        console.log(res);
        this.storage.set(this.HAS_LOGGED_IN, true).then(() => {
          this.storage.remove('familyId');
            this.setUsername(user.username);
          return this.events.publish('user:signup');
        });
      })
    );
  }

  logout(): Promise<any> {
    return this.storage.remove(this.HAS_LOGGED_IN).then(() => {
      return this.storage.remove('username').then(() => {
        return this.storage.remove('familyId').then(() => {
          return this.events.publish('user:logout')}
        );
      });
    });
  }

  setUsername(username: string): Promise<any> {
    return this.storage.set('username', username);
  }

  setFamilyId(familyID: string): Promise<any> {
    return this.storage.set('familyId', familyID);
  }

  setBuilding(building: string): Promise<any> {
    return this.storage.set('building', building);
  }


  setEntrance(entrance: string): Promise<any> {
    return this.storage.set('entrance', entrance);
  }


  setApartment(apartment: string): Promise<any> {
    return this.storage.set('apartment', apartment);
  }

  getUsername(): Promise<string> {
    return this.storage.get('username').then((value) => {
      return value;
    });
  }

  getFamilyId(): Promise<string> {
    return this.storage.get('familyId').then((value) => {
      return value;
    });
  }

  isLoggedIn(): Promise<boolean> {
    return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
      return value === true;
    });
  }
}
