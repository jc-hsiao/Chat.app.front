import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { LoginService } from './services/login.service';
import { User } from '../../src/models/user';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Welcome',
      url: '/folder/welcome',
      icon: 'paw'
    },    
    {
      title: 'Channel1',
      url: '/folder/channel1',
      icon: 'happy'
    },
    {
      title: 'DM1',
      url: '/folder/dm1',
      icon: 'paper-plane'
    }
  ];

  public labels = ['test','test2'];
  currentUser: User = new User();
  //currentUser = {};

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private loginService: LoginService
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
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex =
       this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
    this.setUp();
    
  }

  setUp(){
    this.loginService.getUserData().subscribe(user => {
      this.currentUser = user;
    })    
  }



}
