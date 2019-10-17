import {Component, OnInit, ViewChild} from '@angular/core';
import {AlertController, Config, IonList, LoadingController, ModalController, ToastController} from '@ionic/angular';
import {MockData} from '../../providers/mock-data.service';
import {Router} from '@angular/router';
import {UserData} from '../../providers/user-data';

@Component({
  selector: 'logs',
  templateUrl: './logs.html',
  styleUrls: ['./logs.scss'],
})
export class LogsPage implements OnInit {
// Gets a reference to the list element
  @ViewChild('scheduleList', { static: true }) scheduleList: IonList;

  ios: boolean;
  dayIndex = 0;
  queryText = '';
  segment = 'all';
  excludeTracks: any = [];
  shownSessions: any = [];
  groups: any = [];
  confDate: string;

  constructor(
    public alertCtrl: AlertController,
    public confData: MockData,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public router: Router,
    public toastCtrl: ToastController,
    public user: UserData,
    public config: Config
  ) { }

  ngOnInit() {
    this.updateSchedule();
    this.ios = this.config.get('mode') === 'ios';
  }

  // todo add implementation: this is mocked
  updateSchedule() {
    // Close any open sliding items when the schedule updates
    if (this.scheduleList) {
      this.scheduleList.closeSlidingItems();
    }

    this.confData.getTimeline(this.dayIndex, this.queryText, this.excludeTracks, this.segment).subscribe((data: any) => {
      this.shownSessions = data.shownSessions;
      this.groups = data.groups;
    });
  }

}
