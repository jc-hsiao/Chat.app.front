import { Component, OnInit, ElementRef,Output, EventEmitter  } from '@angular/core';
import { ChatService} from 'src/app/services/chat.service';
import { UserService} from 'src/app/services/user.service';
import { MessageService} from 'src/app/services/message.service';
import { SocketService} from 'src/app/services/socket.service';

import { User } from 'src/app/models/user';
import { Channel } from 'src/app/models/channel';
import { DM } from 'src/app/models/dm';
import { Message } from 'src/app/models/message';
import { ActivatedRoute } from '@angular/router';
import { LocationStrategy } from '@angular/common';

@Component({
  selector: 'app-msg-pane',
  templateUrl: './msg-pane.component.html',
  styleUrls: ['./msg-pane.component.scss'],
})
export class MsgPaneComponent implements OnInit {

  messages: Message[];
  currentUser: User = new User();
  pathId: number;

  channels: Iterable<Channel> = [];
  dms: Iterable<DM> = [];
  
  currentChannel: Channel = new Channel();
  currentDm: DM = new DM();
  chatId:number;
  

  constructor(
    private route: ActivatedRoute,
    private chatService: ChatService,    
    private userService: UserService,
    private messageService :MessageService,
    private socketService: SocketService,
    private url:LocationStrategy) {
    }

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
            this.messageService.setUpMsgs(this.currentChannel.id);
            this.messageService.getMessages().subscribe( m => {
              this.messages = m;
              this.onUpdate(); 
              this.test();
              for(var i=0 ;i<this.messages.length;i++){
                this.messages[i].timeStamp = this.messages[i].timeStamp.replace('T','  / ');
              }
            }) 
          }) 
        }else if(this.url.path().includes('/dm')){ 
          this.chatService.getDms().subscribe( c => {
            this.dms = c;
            this.currentDm = this.dms[this.pathId];
            this.chatId = this.currentDm.id;
            this.messageService.setUpMsgs(this.currentDm.id);
            this.messageService.getMessages().subscribe( m => {
              this.messages = m;
              this.onUpdate(); 
              this.test();
              for(var i=0 ;i<this.messages.length;i++){
                this.messages[i].timeStamp = this.messages[i].timeStamp.replace('T',' ');
              }             
            })             
          }) 
        }
      })
    });
  }

  onUpdate(){
    let client = this.socketService.initializeWebSocketConnection();
    this.socketService.getStompClient();
    client.connect({}, frame => {
      client.subscribe("/pool/"+this.chatId, (message) => { 
        var m = new Message;
        m = JSON.parse(message.body);
        this.messages.push(m);
        this.test();
      });
    });
  }
  
  @Output() childEvent = new EventEmitter();
  test(){
      this.childEvent.emit('!!!!!!!!SCORE TO BOTTOM!!!!!!!!');
  }

  deleteMsgById(id){
    this.messageService.deleteMsg(id).subscribe();
  }

}
