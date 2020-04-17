import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { LoginService } from '../services/login.service';
import { ChannelService } from '../services/channel.service';
import { User } from 'src/models/user';
import { Channel } from 'src/models/channel';
import { ChannelPage } from 'src/models/channelPage';
import { DM } from 'src/models/dm';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public selectedChannelIndex = 0;
  public selectedDMIndex = 0;
  public channelPages:ChannelPage[];
  public dmPages = [];

  public currentUser: User = new User();
  public channels: Iterable<Channel> = [];
  public dms: Iterable<DM> = [];
  

  public appPages = [
    {
      title: 'Welcome',
      url: '/welcome',
      icon: 'paw'
    },    
    {
      title: 'Profile',
      url: '/userinfo',
      icon: 'person'
    }
  ];

  //public labels = ['test','test2'];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private loginService: LoginService,
    private channelService: ChannelService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    this.currentUser = this.loginService.getUser();
    this.channels = this.channelService.getChannels();
    this.dms = this.channelService.getDms();    
    this.channelPages = this.channelService.mapChannelToChat();
    this.dmPages = this.channelService.mapDMToChat();
  }

  ngOnInit() {
  }

  clicked(channelPage:ChannelPage){
    this.channelService.setcurrentChannel(channelPage);
  }
}
