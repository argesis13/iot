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
  familyName: any;
  createFamilyName = '';

  constructor(private familyService: FamilyDetailsService,
              private userService: UserData,
              private router: Router) {
    this.getFamilyId();
  }

  ngOnInit() {
    this.members = [];
    this.getFamilyId();
    this.getFamily();
  }

  ionViewWillEnter() {
    this.members = [];
    this.getFamilyId();
    this.getFamily();
  }

  getFamilyId() {
    this.userService.getFamilyId().then(resp => {
      this.familyName = resp;
    });
  }

  getFamily() {
    this.userService.getUsername().then(res => {
      console.log(res);
      this.familyService.getFamily(res).pipe(
        map(response => {
          this.members = [];
          // this.familyName = '';
          const members = response['members'];
          for (const member of members) {
            member['imageUrl'] = '../../assets/img/speakers/bear.jpg';
            this.members.push(member as UserModel);
          }
        })
      ).subscribe();
    });
  }

  remove(memberName: string) {
    this.userService.getUsername().then(user => {
      this.familyService.removeFamilyMember(user, memberName).subscribe(
        () => {
          this.getFamily();
        }
      );
    });
  }

  createFamily(familyId: string) {
    this.userService.getUsername().then(user => {
        this.familyService.createFamily(user, familyId).subscribe(
          res => {
            this.familyName = res['id'];
            this.userService.setFamilyId(res['id']).then(() => {
              this.createFamilyName = '';
            });
          }
        );
      }
    );
  }

  contact(member) {
    console.log('contact');
  }

  addMember() {
    this.router.navigateByUrl('/app/tabs/family-details/add-member');
  }
}
