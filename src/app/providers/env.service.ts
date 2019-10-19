import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvService {

  public dev_url = 'http://localhost:8282/';
  public prod_url = 'https://cartierul-iot-backend-txxtb4puiq-ew.a.run.app/';

  public url = this.dev_url;

  constructor() { }

}
