import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ModalController} from '@ionic/angular';
import {ModalControllerService} from '../../providers/modal-controller.service';
import {BogusService} from '../../bogus.service';

@Component({
  selector: 'modal-page',
  templateUrl: './modal-page.page.html',
  styleUrls: ['./modal-page.page.scss'],
})
export class ModalPagePage implements OnInit {

  private picture: any;

  constructor(private http: HttpClient, private modalController: ModalController, private bogus:  BogusService) {
  }

  ngOnInit() {
    this.getImage('http://localhost:8282/access/picture/petrescu')
      .subscribe(p => this.picture = p);
  }

  getImage(imageUrl: string): Observable<Blob> {
    return this.http.get(imageUrl, {responseType: 'blob'});
  }

  allow(b: boolean) {
    this.http.post('http://localhost:8282/access/allow/petrescu/' + b, new HttpHeaders())
      .subscribe(r => console.log('allow: ' + b));
    this.modalController.dismiss().then(a => this.bogus.setIsActive(false));
  }

}
