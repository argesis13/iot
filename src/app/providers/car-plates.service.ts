import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PlateModel} from "../interfaces/plate-model";

@Injectable({
  providedIn: 'root'
})
export class CarPlatesService {

  constructor(private http: HttpClient) {

  }

  public getAllowedCars (username: String): Observable<any> {
    return this.http.get('http://localhost:8282/users/' + username + '/plates' );
  }

  public addCar(username: string, plate: PlateModel) {
    return this.http.put('http://localhost:8282/users/' + username + '/plates', plate);
  }
}
