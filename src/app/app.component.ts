import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { UserService} from 'src/app/services/user.service';
import { ChannelService} from 'src/app/services/channel.service';
import { User } from 'src/app/models/user';
import { Channel } from 'src/app/models/channel'
import { DM } from 'src/app/models/dm'

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private userService: UserService,
    private channelService: ChannelService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }


  currentUser: User = new User();
  currentChannels: Iterable<Channel> = [];
  currentDms: Iterable<DM> = [];
  

  ngOnInit() {
    this.userService.login("kitty@gmail.com", "5678");
    this.userService.getUser().subscribe( u => {
      this.currentUser = u;
      this.channelService.setUpChannels(u.id);
      this.channelService.setUpDms(u.id);
      this.channelService.getChannels().subscribe( c => {
        this.currentChannels = c;
      })
      this.channelService.getDms().subscribe( c => {
        this.currentDms = c;
      })      
    })
  }

  setCurrentChat(id:number){
      this.channelService.setCurrentChat(id);
  }


}
