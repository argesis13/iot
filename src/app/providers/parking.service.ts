import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParkingService {

  private parkingObs: Observable<string>;

  constructor() {
    this.parkingObs = new Observable<string>(obs => {
      const eventSource = new EventSource('http://localhost:8282/parking/visitors/1000');
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
