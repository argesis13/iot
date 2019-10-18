import { Component, OnInit } from '@angular/core';

import { NFC, Ndef } from '@ionic-native/nfc/ngx';


@Component({
  selector: 'nfc',
  templateUrl: './nfc.page.html',
  styleUrls: ['./nfc.page.scss'],
})
export class NfcPage implements OnInit {

  constructor(private nfc: NFC, private ndef: Ndef) { }

  ngOnInit() {
  }

  callNfc() {
    this.nfc.addTagDiscoveredListener()
      this.nfc.addNdefListener(() => {
      console.log('successfully attached ndef listener');
    }, (err) => {
      console.log('error attaching ndef listener', err);
    }).subscribe((event) => {
      console.log('received ndef message. the tag contains: ', event.tag);
      console.log('decoded tag id', this.nfc.bytesToHexString(event.tag.id));

      const message = this.ndef.textRecord('Hello world');

      this.nfc.showSettings().then(settings => {
        console.log(settings);
      })
      this.nfc.share([message]).then(onSuccess => {
        console.log(onSuccess);
      }).catch(onError => {
        console.log(onError);
      });
    });
  }

  enabled() {
    this.nfc.enabled().then(res => {
      console.log(res);
    })
  }

  beginSession() {
    this.nfc.beginSession(success => {
      console.log(success);
    }).subscribe(res => {
      console.log(res);
    })
  }


  addListener() {
    console.log('add listener');
    this.nfc.addNdefListener(success => {
      console.log('success');
    }).subscribe(res => {
      console.log(res.tag.id);
    });
    // this.nfc.beginSession(success => {
    //   console.log('begin session');
    // }).subscribe(
    //   res => {
    //     console.log('res');
    //     this.nfc.addNdefListener(success => {
    //       console.log('success');
    //     }).subscribe(res => {
    //       console.log(res.tag.id);
    //     });
    //   }
    // )
  }

  write() {
    this.nfc.write(['bla']).then(res => {
      console.log(res);
    });
    // this.nfc.beginSession(success => {
    //   this.nfc.write(['bla']).then(res => {
    //     console.log(res);
    //   });
    // }).subscribe();
  }

  share() {
    this.nfc.share(['bla']).then(res => {
      console.log(res);
    })
    // this.nfc.beginSession(success => {
    //   this.nfc.share(['bla']).then(res => {
    //     console.log(res);
    //   })
    // }).subscribe();
  }

  showSettings() {
    this.nfc.showSettings().then(res => {
      console.log(res);
    });
    // this.nfc.beginSession(success => {
    //   this.nfc.showSettings().then(res => {
    //     console.log(res);
    //   });
    // }).subscribe();
  }

}
