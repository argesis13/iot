import {Component, OnInit} from '@angular/core';
import {FamilyDetailsService} from '../../providers/family-details.service';
import {map} from 'rxjs/operators';
import {UserModel} from '../../interfaces/user-model';
import {UserData} from '../../providers/user-data';
import {Router} from '@angular/router';

@Component({
  selector: 'family-details',
  templateUrl: './family-details.page.html',
  styleUrls: ['./family-details.page.scss'],
})
export class FamilyDetailsPage implements OnInit {

  members: UserModel[] = [];

  constructor(private familyService: FamilyDetailsService,
              private userService: UserData,
              private router: Router) { }

  ngOnInit() {
    this.getFamily();
  }

  ionViewWillEnter() {
    this.getFamily();
  }

  getFamily() {
    this.userService.getUsername().then(res => {
      console.log(res);
      this.familyService.getFamily(res).pipe(
        map(response => {
          const members = response['members'];
          this.members = [];
          for (const member of members) {
            member['imageUrl'] = '../../assets/img/speakers/bear.jpg';
            this.members.push(member as UserModel);
          }
        })
      ).subscribe();
    });
  }

  remove(memberName: string) {
    console.log(memberName);
    for (const member of this.members) {
      if (member.username === memberName) {
        const index = this.members.indexOf(member, 0);
        if (index > -1) {
          this.members.splice(index, 1);
        }
      }
    }
  }

  contact(member) {
    console.log('contact');
  }

  addMember() {
    this.router.navigateByUrl('/app/tabs/family-details/add-member');
  }
}
