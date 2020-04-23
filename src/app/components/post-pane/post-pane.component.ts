import { Component, OnInit } from '@angular/core';

import { UserService} from 'src/app/services/user.service';
import { ChatService} from 'src/app/services/chat.service';
import { User } from 'src/app/models/user';
import { Channel } from 'src/app/models/channel';
import { DM } from 'src/app/models/dm';
import { Message } from 'src/app/models/message';
import { ActivatedRoute } from '@angular/router';
import { LocationStrategy } from '@angular/common';

import { MessageService} from 'src/app/services/message.service';
import { SocketService } from 'src/app/services/socket.service'

@Component({
  selector: 'app-post-pane',
  templateUrl: './post-pane.component.html',
  styleUrls: ['./post-pane.component.scss'],
})
export class PostPaneComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private chatService: ChatService,    
    private userService: UserService,
    private socketService: SocketService,
    private url:LocationStrategy) { }

    currentUser: User = new User();
    pathId: number;
  
    channels: Iterable<Channel> = [];
    dms: Iterable<DM> = [];
    
    currentChannel: Channel = new Channel();
    currentDm: DM = new DM();
    chatId:number;

  ngOnInit() {
     //get id from path
     this.route.params.subscribe(params => {
      this.pathId = +params['id']; // (+) converts string 'id' to a number
      this.userService.getUser().subscribe( u => {
        this.currentUser = u;
        this.chatService.getCurrentChatid

        if(this.url.path().includes('/channel')){
          this.chatService.getChannels().subscribe( c => {
            this.channels = c;
            this.currentChannel = this.channels[this.pathId];
            this.chatId = this.currentChannel.id;
          }) 
        }else if(this.url.path().includes('/dm')){
          this.chatService.getDms().subscribe( c => {
            this.dms = c;
            this.currentDm = this.dms[this.pathId];
            this.chatId = this.currentDm.id;
          }) 
        }
      })
    }); 
  }

  sendMsg(msg:string){
    if(msg.length != 0 && msg != "\n"){
      console.log(this.currentUser.displayName+" says "+msg+" in chat"+this.chatId);
      // this.messageService.addNewMessage(this.currentUser.id,this.chatId,msg).subscribe(msg => {
      //   this.messages.push(msg);
      // });
      //this.socketService.sendMessage(this.currentUser.id, this.chatId, msg);
      this.socketService.sendMessage(this.currentUser.id, this.chatId, msg);
    }
  }

}
