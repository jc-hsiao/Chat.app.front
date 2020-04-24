import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ChatService} from 'src/app/services/chat.service';
import { UserService} from 'src/app/services/user.service';
import { MessageService} from 'src/app/services/message.service';
import { SocketService} from 'src/app/services/socket.service';
import { EmojiService } from 'src/app/services/emoji.service';

import { User } from 'src/app/models/user';
import { Channel } from 'src/app/models/channel';
import { DM } from 'src/app/models/dm';
import { Message } from 'src/app/models/message';
import { Emoji } from 'src/app/models/emoji'
import { ActivatedRoute } from '@angular/router';
import { LocationStrategy } from '@angular/common';
import { EmojiCount } from 'src/app/models/emojiCount';

@Component({
  selector: 'app-msg-pane',
  templateUrl: './msg-pane.component.html',
  styleUrls: ['./msg-pane.component.scss'],
})
export class MsgPaneComponent implements OnInit {
  
  emojiOverlayHidden: boolean = true;
  messages: Message[];
  currentUser: User = new User();
  pathId: number;

  channels: Iterable<Channel> = [];
  dms: Iterable<DM> = [];
  
  currentChannel: Channel = new Channel();
  currentDm: DM = new DM();
  chatId:number;

  emojiList: Emoji[] = [];
  err: string = "";

  constructor(
    private route: ActivatedRoute,
    private chatService: ChatService,    
    private userService: UserService,
    private messageService :MessageService,
    private socketService: SocketService,
    private url:LocationStrategy,
    private emojiService :EmojiService) {
    }

  ngOnInit() {

    
    //get id from path
    this.route.params.subscribe(params => {
      this.emojiService.getEmojis().subscribe( e => {this.emojiList = e})
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
    client.connect({}, frame => {
      client.subscribe("/pool/"+this.chatId, (message) => { 
        var m = new Message;
        m = JSON.parse(message.body);
        if(m.timeStamp.length>19){
          m.timeStamp = m.timeStamp.substring(0,19);
        }
        m.timeStamp = m.timeStamp.replace('T',' ');
        this.messages.push(m);
        this.test();
      });      
    });
  }
  
  @Output() childEvent = new EventEmitter();
  test(){
      this.childEvent.emit('!!!!!!!!SCORE TO BOTTOM!!!!!!!!');
  }

  idToImage(id){
    if(id == null) return null;
    for( var e of this.emojiList){
      if(e.id == id){
        return e.image;
      }
    }
  }



  agreeEmoji(eid,mid){
    this.messageService.agreeEmoji(eid,mid).subscribe();
  }

  targetMessageId: number;
  openEmojiWin(mid){
    this.targetMessageId = mid;
    this.emojiOverlayHidden = false;
  }

  reactEmoji(emoId){
    //console.log(emoId+" "+this.targetMessageId);
    this.messageService.reactEmoji(emoId,this.targetMessageId).subscribe(m => {
      if(m == null){
        console.log("UH-OH")
        this.err = "Some one has already reacted with that emoji...";
      }else{
        for( var m of this.messages){
          if(m.id==this.targetMessageId){
            var ec = new EmojiCount();
            ec.emojiId = emoId;
            ec.count = 1;
            m.emojiCounts.push(ec);
            this.closePopUp();
            break;
          }
        }
      }
    });
  }

  closePopUp(){
    this.emojiOverlayHidden = true;
    this.err = "";
  }

  deleteMsgById(id){
    this.messageService.deleteMsg(id).subscribe(n => {
      var deleteId = n;
      var bye;
      for(var i=0 ;i<this.messages.length;i++){
        if(this.messages[i].id == deleteId){
          bye = i;
          break;
        }
      }
      this.messages.splice(bye,1);      
    });
  }

}
