import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { FormsModule } from '@angular/forms';
import { VideoPlayer } from '@ionic-native/video-player/ngx';
import { NFC, Ndef } from '@ionic-native/nfc/ngx';
import { ReactiveFormsModule } from '@angular/forms';
import {StreamingMedia} from '@ionic-native/streaming-media/ngx';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player/ngx';
import {AccessService} from './providers/access.service';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production
    })
  ],
  declarations: [AppComponent],
  providers: [InAppBrowser, SplashScreen, StatusBar, VideoPlayer, NFC, Ndef, StreamingMedia, YoutubeVideoPlayer],
  bootstrap: [AppComponent]
})
export class AppModule {}
