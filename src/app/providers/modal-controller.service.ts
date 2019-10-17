import {Injectable} from '@angular/core';
import {ModalController, NavController} from '@ionic/angular';
import {ModalPagePage} from '../pages/modal-page/modal-page.page';
import {Observable} from 'rxjs';
import {BogusService} from '../bogus.service';

@Injectable({
  providedIn: 'root'
})
export class ModalControllerService {

  constructor(private modalController: ModalController, private navController: NavController, private bogus: BogusService) {
    this.observeMessages('http://localhost:8282/access/query/petrescu/1000')
      .subscribe(message => {
        console.log(message);
        if (message.includes('PENDING')) {
          this.presentModal().then(a => this.bogus.setIsActive(true));
        }
      });
  }


  async presentModal() {
    if (this.bogus.isActive()) {
      return;
    }
    const modal = await this.modalController.create({
      component: ModalPagePage
    });

    return await modal.present().then(a => this.bogus.setIsActive(true));
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
