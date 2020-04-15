import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { LoginService } from '../services/login.service';
import { ChannelService } from '../services/channel.service';
import { User } from '../../src/models/user';
import { Channel } from '../../src/models/channel';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  currentUser: User = new User();
  currentChannels: Iterable<Channel> = [];

  //dm array
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

  public channelPages = [
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
  }

  ngOnInit() {
    // const path = window.location.pathname.split('folder/')[1];
    // if (path !== undefined) {
    //   this.selectedIndex =
    //    this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    // }
    this.setUp();
    
  }

  setUp(){
    this.loginService.getUserData().subscribe(user => {
      this.currentUser = user;
    })    
    this.channelService.getAllChannel().subscribe(it => {
      this.currentChannels = it;
      this.mapToChat();
    })    
  }

  mapToChat(){
    for (let ch of this.currentChannels) {
      var channel = {
        title: ch.name,
        url: '/chat'+ ch.id
      };
      this.channelPages.push(channel);
    }    
  }



}
