import {Component, OnInit} from '@angular/core';
import {VideoPlayer} from '@ionic-native/video-player/ngx';
import {Plugins} from '@capacitor/core';
import * as CapacitorVPPlugin from 'capacitor-video-player';
import {MockData} from '../../providers/mock-data.service';
import {StreamingMedia} from '@ionic-native/streaming-media/ngx';
import {CameraModel} from '../../interfaces/camera-model';
import {YoutubeVideoPlayer} from '@ionic-native/youtube-video-player/ngx';


const { CapacitorVideoPlayer, Device } = Plugins;


@Component({
  selector: 'video-player',
  templateUrl: './video-player.page.html',
  styleUrls: ['./video-player.page.scss'],
})
export class VideoPlayerPage implements OnInit {

  cameras: any[] = [];

  constructor(private videoPlayer: VideoPlayer,
              public confData: MockData,
              private streamingMedia: StreamingMedia,
              private youtube: YoutubeVideoPlayer) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.confData.getCameras().subscribe((cameras: any[]) => {
      for (const camera of cameras) {
        this.cameras.push(camera as CameraModel);
      }
    });
  }

  async play(camera: CameraModel) {

    // const options: StreamingVideoOptions = {
    //   successCallback: () => { console.log('Video played'); },
    //   errorCallback: (e) => { console.log('Error streaming'); },
    //   orientation: 'portrait',
    //   shouldAutoClose: true,
    //   controls: false
    // };
    //
    // this.streamingMedia.playVideo(camera.url, options);

    let videoPlayer: any;
    const info = await Device.getInfo();
    if (info.platform === 'ios' || info.platform === 'android') {
      videoPlayer = CapacitorVideoPlayer;
    } else {
      videoPlayer = CapacitorVPPlugin.CapacitorVideoPlayer;
    }
    const res: any  = await videoPlayer.play({url: camera.url});
  }

  playVideo() {
    this.videoPlayer.play('https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4').then(() => {
      console.log('video completed');
    }).catch(err => {
      console.log(err);
    });
  }


}
