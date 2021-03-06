import { Component, OnInit, ViewChild } from '@angular/core';
import { ChatService} from 'src/app/services/chat.service';
import { UserService} from 'src/app/services/user.service';

import { User } from 'src/app/models/user';
import { DM } from 'src/app/models/dm';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dm',
  templateUrl: './dm.component.html',
  styleUrls: ['./dm.component.scss'],
})
export class DmComponent implements OnInit {
  @ViewChild('content',{static:true}) private content: any;

  constructor(
    private route: ActivatedRoute,
    private chatService: ChatService,
    private userService: UserService) { }


  path: string = "dm";
  pathId: number;
  dms: DM[] = [];
  currentUser: User = new User();
  currentDm: DM = new DM();
  ngOnInit() {
    //get id from path
    this.route.params.subscribe(params => {

      this.pathId = +params['id']; // (+) converts string 'id' to a number
      this.userService.getUser().subscribe( u => {
        this.currentUser = u;
        this.chatService.getDms().subscribe( c => {
          this.dms = c;
          this.currentDm = this.dms[this.pathId];
        })      
      })
    });        
  }
  
  scrollToBottomOnInit() {
    this.content.scrollToBottom(100);
  }  
  test(msg){
    this.scrollToBottomOnInit();
    console.log(msg);
  }
}
