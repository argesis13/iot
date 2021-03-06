import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FamilyDetailsService} from '../../providers/family-details.service';
import {UserData} from '../../providers/user-data';
import {ParkingService} from '../../providers/parking.service';
import {CarPlatesService} from "../../providers/car-plates.service";

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  members = 0;
  cars = 0;
  private parkingTotal = 0;
  private parkingOccupied = 0;

  constructor(private router: Router,
              private familyService: FamilyDetailsService,
              private userService: UserData,
              private parkingService: ParkingService,
              private carPlatesService: CarPlatesService) {
  }

  ngOnInit() {
    this.getfamily();
    this.getParkings();
    this.getCars();
  }

  private getfamily() {
    this.members = 0;
    this.userService.getUsername().then(res => {
      this.members = 0;
      this.familyService.getFamilyNumber(res).subscribe(
        response => {
          this.members = response;
        }
      );
      this.familyService.getFamily(res).subscribe();
    });
  }

  private getParkings() {
    this.parkingService.getParkingAreaLive()
      .subscribe(message => {
        const pa = JSON.parse(message);
        const slots: [] = pa['slots'];
        if (slots === undefined || slots === null) {
          this.parkingTotal = 0;
        } else {
          this.parkingTotal = slots.length;
        }
        this.parkingOccupied = 0;
        slots.forEach(slot => {
          if (slot['status'] === 'OCCUPIED') {
            this.parkingOccupied += 1;
          }
        });
      });
  }

  private getCars() {
    this.cars = 0;
    this.userService.getUsername().then(username => {
      this.carPlatesService.getAllowedCars(username).subscribe(plates => {
          let array = plates as [];
          if (array === undefined || array === null) {
            this.cars = 0;
          } else {
            this.cars = array.length;
          }

        }
      );
    });
  }

  ionViewWillEnter() {
    this.members = 0;
    this.userService.getUsername().then(res => {
      this.familyService.getFamilyNumber(res).subscribe(
        response => {
          this.members = response;
        }
      );
    });
    this.getCars();
  }

}
