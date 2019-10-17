import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, pipe} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccessService {

  constructor() {

  }

  observeMessages(accessServiceUrl: string): Observable<string> {
    return new Observable<string>(obs => {
      const eventSource = new EventSource(accessServiceUrl);
      eventSource.addEventListener('message', (evt) => {
        obs.next(evt.data);
      });
      return () => eventSource.close();
    });
  }
}
