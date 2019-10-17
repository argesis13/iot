import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BogusService {

  private active = false;

  constructor() {
  }

  setIsActive(b: boolean) {
    this.active = b;
  }

  isActive() {
    return this.active;
  }

}
