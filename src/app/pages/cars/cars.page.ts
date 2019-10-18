import { Component, OnInit } from '@angular/core';
import {IonDatetime} from "@ionic/angular";

@Component({
  selector: 'cars',
  templateUrl: './cars.page.html',
  styleUrls: ['./cars.page.scss'],
})
export class CarsPage implements OnInit {

  plates = [];
  now: Date;
  tomorrow: Date;

  constructor() { }

  ngOnInit() {
    this.now = new Date();
    this.tomorrow = new Date();
    this.tomorrow.setDate(this.tomorrow.getDate() + 1);
  }

  ionViewWillEnter() {
    this.now = new Date();
    this.tomorrow = new Date();
    this.tomorrow.setDate(this.tomorrow.getDate() + 1);
  }

  addLicensePlate() {

  }

}
