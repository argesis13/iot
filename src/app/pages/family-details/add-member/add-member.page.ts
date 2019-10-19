import { Component, OnInit } from '@angular/core';
import {UserModel} from '../../../interfaces/user-model';
import {map} from 'rxjs/operators';
import {FamilyDetailsService} from '../../../providers/family-details.service';
import {UserData} from '../../../providers/user-data';
import {PlateModel} from "../../../interfaces/plate-model";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'add-member',
  templateUrl: './add-member.page.html',
  styleUrls: ['./add-member.page.scss'],
})
export class AddMemberPage implements OnInit {

  queryText = '';
  members: UserModel[] = [];
  _membersSubject = new BehaviorSubject<UserModel[]>([]);
  readonly membersSubject = this._membersSubject.asObservable();
  submitted = false;

  constructor(private familyService: FamilyDetailsService, private userService: UserData) { }

  ngOnInit() {
  }

  search() {
    if (this.queryText === '') {
      this.members = [];
      this._membersSubject.next(this.members);
      return;
    }
    this.userService.getUsername().then(username => {
      this.familyService.searchMember(username, this.queryText).pipe(
        map(res => {
          for (const member of res as UserModel[]) {
            this.userService.getUsername().then(
              username => {
                if(member.username !== username) {
                  member['imageUrl'] = '../../assets/img/speakers/bear.jpg';
                  this.members.push(member);
                }
              }
            );
          }
          this._membersSubject.next(this.members);
        })
      ).subscribe();
    });
  }

  addToFamily(member: UserModel) {
    this.userService.getUsername().then(
      username => {
      this.familyService.addFamilyMember(username, member).subscribe(fam => {
          console.log(fam);
        }
      );
    });
  }
}
