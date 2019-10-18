import {Component} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ModalController} from '@ionic/angular';
import {BogusService} from '../../bogus.service';
import {UserData} from '../../providers/user-data';

@Component({
  selector: 'modal-page',
  templateUrl: './modal-page.page.html',
  styleUrls: ['./modal-page.page.scss'],
})
export class ModalPagePage {

  private picture: any;

  constructor(private http: HttpClient, private modalController: ModalController
    , private bogus: BogusService,
              private userData: UserData) {
  }


  ionViewWillEnter() {
    this.picture = '';
    this.userData.getUsername().then(u => {
      console.log(u + 'view enter');
      this.picture = 'http://localhost:8282/access/picture/' + u + '/' + new Date().getMilliseconds();
      console.log(this.picture);
    });
  }

  allow(b: boolean) {
    this.userData.getUsername().then(u => {
      this.http.post('http://localhost:8282/access/allow/' + u + '/' + b, new HttpHeaders())
        .subscribe(r => console.log('allow: ' + b));
      this.modalController.dismiss().then(a => this.bogus.setIsActive(false));
    });
  }

}
