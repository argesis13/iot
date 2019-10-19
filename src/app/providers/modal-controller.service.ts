import {Injectable} from '@angular/core';
import {ModalController, NavController} from '@ionic/angular';
import {ModalPagePage} from '../pages/modal-page/modal-page.page';
import {Observable} from 'rxjs';
import {BogusService} from '../bogus.service';
import {UserData} from './user-data';
import {EnvService} from "./env.service";

@Injectable({
  providedIn: 'root'
})
export class ModalControllerService {

  eventSource: EventSource;

  constructor(private modalController: ModalController,
              private navController: NavController,
              private bogus: BogusService,
              private userData: UserData,
              private env: EnvService) {
    this.startToListenToAccess();

  }


  private startToListenToAccess() {
    this.userData.getUsername().then(u => {
      this.observeMessages(this.env.url + '/access/query/' + u + '/1000')
        .subscribe(message => {
          console.log(message);
          if (message.includes('PENDING')) {
            this.presentModal();
          }
        });
    });
  }

  async presentModal() {
    if (this.bogus.isActive()) {
      return;
    }
    const modal = await this.modalController.create({
      component: ModalPagePage
    });
    this.bogus.setIsActive(true);
    return await modal.present();
  }


  observeMessages(accessServiceUrl: string): Observable<string> {
    return new Observable<string>(obs => {
      this.eventSource = new EventSource(accessServiceUrl);
      this.eventSource.addEventListener('message', (evt) => {
        obs.next(evt.data);
      });
      return () => this.eventSource.close();
    });
  }


  public refresh() {
    this.eventSource.close();
    this.startToListenToAccess();
  }
}
