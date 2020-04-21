import { Component, OnInit, ElementRef  } from '@angular/core';
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
    private chatService: ChatService,
    private el: ElementRef
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
  err: string = "";
  err2: string = "";

  ngOnInit() {
  }


  validateLogin(email:string, pass:string){
    if(email == "" || pass== ""){
      this.err = "Some fields are empty!";
      return 0;
    }
    console.log("attempt to log in with " +email+" and "+pass);
    let spPane = this.el.nativeElement.querySelector("ion-split-pane");
    let overlay = this.el.nativeElement.querySelector(".my-overlay");    
    this.userService.login(email, pass);
    this.userService.getUser().subscribe( u => {    
      if(u==null){
        this.err = "Oops! Something is wrong with your credentials";
      }else{
        this.currentUser = u;
        this.overlayHidden = true;
        this.chatService.setUpChannels(u.id);
        this.chatService.setUpDms(u.id);
        this.chatService.getChannels().subscribe( c => {
          this.currentChannels = c;
        })
        this.chatService.getDms().subscribe( c => {
          this.currentDms = c;
        })     
        if(spPane.classList.contains('blur')){
          spPane.classList.remove('blur'); 
        }
        if(!overlay.classList.contains('bye')){
          overlay.classList.add('bye')
        }
      }
    })
  }


  toggleSignIn(){
    let inner = this.el.nativeElement.querySelector(".inner");
    let bt2 = this.el.nativeElement.querySelector(".btn2");
    if(!inner.classList.contains('inner2')){
      inner.classList.add('inner2'); 
      bt2.classList.add("nope");
    }else if(inner.classList.contains('inner2')){
      inner.classList.remove('inner2'); 
      bt2.classList.remove("nope");
    }
  }

  validateSignUp(email:string, pass:string, name:string){
    if(email == "" || pass== "" || name == ""){
      this.err2 = "Some fields are empty!";
      return 0;
    }    
    this.userService.register(email, pass,name).subscribe( u => {
      if(u==null){
        this.err2 = "Someone already used that email!";
      }else{
        this.validateLogin(email,pass);
      }
    });
  }


  clearErr(){
    this.err = "";
    this.err2 = "";
  }

}
