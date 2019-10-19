import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvService {

  public dev_url = 'http://localhost:8282/';
  public prod_url = 'http://35.232.137.184/';

  public url = this.prod_url;

  constructor() { }

}
