import { Component, OnInit } from '@angular/core';
import {ParkingService} from '../../providers/parking.service';

@Component({
  selector: 'parking-area',
  templateUrl: './parking-area.page.html',
  styleUrls: ['./parking-area.page.scss'],
})
export class ParkingAreaPage implements OnInit {

  private parkingArea;

  constructor(private parkingService: ParkingService) { }

  ngOnInit() {
    const parkingArea = this.parkingService.getParkingAreaLive()
      .subscribe(message => {
        this.parkingArea = JSON.parse(message);
        console.log(this.parkingArea);
      });
  }

}
