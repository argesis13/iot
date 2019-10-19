import {Component, OnInit} from '@angular/core';
import {FamilyDetailsService} from '../../providers/family-details.service';
import {map} from 'rxjs/operators';
import {UserModel} from '../../interfaces/user-model';
import {UserData} from '../../providers/user-data';
import {Router} from '@angular/router';
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'family-details',
  templateUrl: './family-details.page.html',
  styleUrls: ['./family-details.page.scss'],
})
export class FamilyDetailsPage implements OnInit {

  familyName: any;
  createFamilyName = '';

  members: UserModel[] = [];
  _membersSubject = new BehaviorSubject<UserModel[]>([]);
  readonly membersSubject = this._membersSubject.asObservable();

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
    // this.members = [];
    // this.getFamilyId();
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
        map(fam => {
          const members = fam['members'];
          for (const member of members) {
            member['imageUrl'] = '../../assets/img/speakers/bear.jpg';
          }
          this.members = members;
          this._membersSubject.next(this.members);
        })
      ).subscribe();
    });
  }

  remove(memberName: string) {
    this.userService.getUsername().then(user => {
      this.familyService.removeFamilyMember(user, memberName).pipe(
        map(fam => {
          let members = fam['members'] as UserModel[];
          let withoutme = [];
          for (const member of members) {
            if(member.username !== user) {
              member['imageUrl'] = '../../assets/img/speakers/bear.jpg';
              withoutme.push(member);
            }
          }
          this.members = withoutme;
          this._membersSubject.next(this.members);
        })
      ).subscribe();
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

  addMember() {
    this.router.navigateByUrl('/app/tabs/family-details/add-member');
  }
}
