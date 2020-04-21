import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { UserService} from 'src/app/services/user.service';
import { ChatService } from 'src/app/services/chat.service';
import { User } from 'src/app/models/user';
import { Channel } from 'src/app/models/channel'
import { DM } from 'src/app/models/dm'


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

  overlayHidden: boolean = false;
  constructor(
    public modalCtrl: ModalController,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private userService: UserService,
    private chatService: ChatService
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
  

  ngOnInit() {}

  validate(){
    console.log("attempt to log in");
    this.userService.login("puppy@gmail.com", "1234");
    this.overlayHidden = true;
    this.userService.getUser().subscribe( u => {
      this.currentUser = u;
      this.chatService.setUpChannels(u.id);
      this.chatService.setUpDms(u.id);
      this.chatService.getChannels().subscribe( c => {
        this.currentChannels = c;
      })
      this.chatService.getDms().subscribe( c => {
        this.currentDms = c;
      })      
    })
  }



}
