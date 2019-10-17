import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FamilyDetailsService} from '../../providers/family-details.service';
import {UserData} from '../../providers/user-data';
import {AccessService} from '../../providers/access.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  members = 0;
  private sseStream: Subscription;

  constructor(private router: Router, private familyService: FamilyDetailsService, private userService: UserData) {
  }

  ngOnInit() {
    this.userService.getUsername().then(res => {
    this.members = 0;
      this.familyService.getFamilyNumber(res).subscribe(
        response => {
          this.members = response;
        }
      );
    });
  }

  ionViewWillEnter() {
    this.userService.getUsername().then(res => {
      this.members = 0;
        this.familyService.getFamilyNumber(res).subscribe(
          response => {
            this.members = response;
          }
        );
    });
  }

  goToFamilyDetails() {
    this.router.navigateByUrl('/app/tabs/family-details/members');
  }
}
