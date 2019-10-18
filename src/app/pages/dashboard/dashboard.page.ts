import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FamilyDetailsService} from '../../providers/family-details.service';
import {UserData} from '../../providers/user-data';
import {Subscription} from 'rxjs';
import {ParkingService} from '../../providers/parking.service';
import {CarPlatesService} from "../../providers/car-plates.service";

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  members = 0;
  private sseStream: Subscription;
  cars = 0;
  private parkingTotal = 0;

  constructor(private router: Router,
              private familyService: FamilyDetailsService,
              private userService: UserData,
              private parkingService: ParkingService,
              private carPlatesService: CarPlatesService) {
  }

  ngOnInit() {
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

    this.parkingService.getParkingAreaLive()
      .subscribe(message => {
        const pa = JSON.parse(message);
        this.parkingTotal = pa['slots'].length;
      });

    this.cars = 0;
    this.userService.getUsername().then(username => {
      this.carPlatesService.getAllowedCars(username).subscribe(plates => {
          let array = plates as [];
          this.cars = array.length;
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
    this.cars = 0;
    this.userService.getUsername().then(username => {
      this.carPlatesService.getAllowedCars(username).subscribe(plates => {
          let array = plates as [];
          this.cars = array.length;
        }
      );
    });
  }

  goToFamilyDetails() {
    this.router.navigateByUrl('/app/tabs/family-details/members');
  }
}
