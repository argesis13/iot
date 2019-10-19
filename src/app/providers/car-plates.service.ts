import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PlateModel} from "../interfaces/plate-model";
import Env = jasmine.Env;
import {EnvService} from "./env.service";

@Injectable({
  providedIn: 'root'
})
export class CarPlatesService {

  constructor(private http: HttpClient, private env: EnvService) {
  }

  public getAllowedCars (username: String): Observable<any> {
    return this.http.get(this.env.url + 'users/' + username + '/plates' );
  }

  public addCar(username: string, plate: PlateModel) {
    return this.http.put(this.env.url + 'users/' + username + '/plates', plate);
  }

  public removePlate(username: string, plateId: string) {
    return this.http.delete(this.env.url + 'users/' + username + '/plates/' + plateId );
  }
}
