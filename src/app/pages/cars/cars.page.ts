import {Component, OnInit} from '@angular/core';
import {CarPlatesService} from "../../providers/car-plates.service";
import {UserData} from "../../providers/user-data";
import {PlateModel} from "../../interfaces/plate-model";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'cars',
  templateUrl: './cars.page.html',
  styleUrls: ['./cars.page.scss'],
})
export class CarsPage implements OnInit {

  plates: PlateModel[] = [];
  _platesSubject = new BehaviorSubject<PlateModel[]>([]);
  readonly platesSubject = this._platesSubject.asObservable();
  now: Date;
  tomorrow: Date;
  isChecked: false;
  plateNumber: string;
  placeholder = "License Plate Number...";

  constructor(private carPlatesService: CarPlatesService, private userService: UserData) { }

  ngOnInit() {
    this.plates = [];
    this.isChecked = false;
    this.now = new Date();
    this.tomorrow = new Date();
    this.tomorrow.setDate(this.tomorrow.getDate() + 1);
    this.userService.getUsername().then(user => {
        this.carPlatesService.getAllowedCars(user).subscribe(plates => {
            this.plates = plates;
            this._platesSubject.next(plates);
          }
        );
      }
    )
  }

  ionViewWillEnter() {
    this.plates = [];
    this.isChecked = false;
    this.now = new Date();
    this.tomorrow = new Date();
    this.tomorrow.setDate(this.tomorrow.getDate() + 1);
    this.userService.getUsername().then(user => {
        this.carPlatesService.getAllowedCars(user).subscribe(plates => {
            this.plates = plates;
            this._platesSubject.next(plates);
          }
        );
      }
    )
  }

  removePlate(plateNumber) {
    this.userService.getUsername().then(user => {
      this.carPlatesService.removePlate(user, plateNumber).subscribe(() => {
        this.carPlatesService.getAllowedCars(user).subscribe(plates => {
            console.log(plates);
            this.plates = plates;
            this._platesSubject.next(plates);
          }
        );
        }
      );
    });
  }

  addLicensePlate() {
    let request: PlateModel;
    if(this.isChecked) {
      request = {
        number: this.plateNumber,
        from: null,
        to: null
      };
    } else {
      request = {
        number: this.plateNumber,
        from: this.now.getMilliseconds(),
        to: this.tomorrow.getMilliseconds()
      };
    }
      this.userService.getUsername().then(user => {
          this.carPlatesService.addCar(user, request).subscribe(() => {
              this.carPlatesService.getAllowedCars(user).subscribe(plates => {
                  this.plates = plates;
                  this._platesSubject.next(plates);
                  this.plateNumber = '';
                }
              );
            }
          )
        }
      )
  }

  changeNow(date) {
    this.now = new Date(date.detail.value);
  }

  changeTomorrow(date) {
    this.tomorrow = new Date(date.detail.value);
  }

}
