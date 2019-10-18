import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cars',
  templateUrl: './cars.page.html',
  styleUrls: ['./cars.page.scss'],
})
export class CarsPage implements OnInit {

  plates = [];

  constructor() { }

  ngOnInit() {
  }

}
