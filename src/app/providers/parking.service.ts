import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import Env = jasmine.Env;
import {EnvService} from "./env.service";

@Injectable({
  providedIn: 'root'
})
export class ParkingService {

  private parkingObs: Observable<string>;

  constructor(private env: EnvService) {
    this.parkingObs = new Observable<string>(obs => {
      const eventSource = new EventSource(this.env.url + '/parking/visitors/1000');
      eventSource.addEventListener('message', (evt) => {
        obs.next(evt.data);
      });
      return () => eventSource.close();
    });
  }

  public getParkingAreaLive(): Observable<string> {
    return this.parkingObs;
  }


}
