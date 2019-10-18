import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ModalController} from '@ionic/angular';
import {ModalControllerService} from '../../providers/modal-controller.service';
import {BogusService} from '../../bogus.service';
import {UserData} from '../../providers/user-data';

@Component({
  selector: 'modal-page',
  templateUrl: './modal-page.page.html',
  styleUrls: ['./modal-page.page.scss'],
})
export class ModalPagePage implements OnInit {

  private picture: any;

  constructor(private http: HttpClient, private modalController: ModalController
              , private bogus:  BogusService,
              private userData: UserData) {
  }

  ngOnInit() {
    this.userData.getUsername().then(u => {
      this.getImage('http://localhost:8282/access/' + u + '/petrescu')
        .subscribe(p => this.picture = p);
    });

  }

  getImage(imageUrl: string): Observable<Blob> {
    return this.http.get(imageUrl, {responseType: 'blob'});
  }

  allow(b: boolean) {
    this.userData.getUsername().then(u => {
      this.http.post('http://localhost:8282/access/allow/' + u + '/' + b, new HttpHeaders())
        .subscribe(r => console.log('allow: ' + b));
      this.modalController.dismiss().then(a => this.bogus.setIsActive(false));
    });
  }

}
