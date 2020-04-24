import { Component, OnInit, ElementRef } from '@angular/core';
import { ModalController } from '@ionic/angular';
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

  loginOverlayHidden: boolean = false;
  addChannelOverlayHidden:boolean = true;
  addDMOverlayHidden: boolean = true;
  selectedLevel:number = null;

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


  userList: User[] = [];
  currentUser: User = new User();
  currentChannels: Channel[] = [];
  currentDms: DM[] = [];
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
    this.userService.login(email, pass);
    this.setup();
  }

  setup(){
    this.userService.getUser().subscribe( u => {    
      if(u==null){
        this.err = "Oops! Something is wrong with your credentials";
      }else{
        this.currentUser = u;
        this.loginOverlayHidden = true;
        this.chatService.setUpChannels(u.id);
        this.chatService.setUpDms(u.id);
        this.chatService.getChannels().subscribe( c => {
          this.currentChannels = c;
        })
        this.chatService.getDms().subscribe( c => {
          this.currentDms = c;
        })
        this.userService.grabAllUsers().subscribe( all =>{
          this.userList = all;
          //have to remove current user from this list
          this.removeCurrentUserFromArray(all);
        })

        this.toggleBlur();
        let overlay = this.el.nativeElement.querySelector(".overlay");
        if(!overlay.classList.contains('bye')){
          overlay.classList.add('bye')
        }
        this.clearErr();
      }
    })
  }

  removeCurrentUserFromArray(arr: User[]){
    var temp;
    var index;
    for( var u of arr ){
      if(u.id == this.currentUser.id ){
        temp = u;
        index = arr.indexOf(temp);
      }            
    }
    this.userList.splice(index,1);

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
    this.clearErr();
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
    this.clearErr();
  }

  popUpNewChannel(){
    this.toggleBlur();
    this.addChannelOverlayHidden = false;
  }

  popUpNewDM(){
    this.toggleBlur();
    this.addDMOverlayHidden = false;
  }

  createNewChannel(name:string){
    if(name.length == 0){
      this.err = "You can't give it an empty name!";
    }else{
      this.chatService.createChannel(this.currentUser.id,name).subscribe( ch => this.currentChannels.push(ch));
      this.closePopUp();
    }
  }

  createNewDM(){
    if(this.selectedLevel == null){
      this.err = "You didn't select anyone!";
    }else{
      var targetUserid = this.selectedLevel;
      this.userService.grabUserById(targetUserid).subscribe( u => {
        this.chatService.createDM(this.currentUser.id, u).subscribe( d => this.currentDms.push(d));
      });
      this.closePopUp();
    }
  }

  clearErr(){
    this.err = "";
    this.err2 = "";
  }

  closePopUp(){
    this.loginOverlayHidden = true;
    this.addChannelOverlayHidden = true;
    this.addDMOverlayHidden = true;
    this.toggleBlur();
    this.clearErr();
  }

  toggleBlur(){
    let spPane = this.el.nativeElement.querySelector("ion-split-pane");        
    if(spPane.classList.contains('blur')){
      spPane.classList.remove('blur'); 
    }else if(!spPane.classList.contains('blur')){
      spPane.classList.add('blur'); 
    }
  }

}
