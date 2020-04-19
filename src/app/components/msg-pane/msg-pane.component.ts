import { Component, OnInit } from '@angular/core';
import { ChannelService} from 'src/app/services/channel.service';
import { UserService} from 'src/app/services/user.service';
import { MessageService} from 'src/app/services/message.service';

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

  messages: Iterable<Message> = [];
  currentUser: User = new User();
  pathId: number;

  channels: Iterable<Channel> = [];
  dms: Iterable<DM> = [];
  
  currentChannel: Channel = new Channel();
  currentDm: DM = new DM();

  constructor(
    private route: ActivatedRoute,
    private channelService: ChannelService,    
    private userService: UserService,
    private messageService :MessageService,
    private url:LocationStrategy) { }

  ngOnInit() {
    //get id from path
    this.route.params.subscribe(params => {
      this.pathId = +params['id']; // (+) converts string 'id' to a number
      this.userService.getUser().subscribe( u => {
        this.currentUser = u;
        this.channelService.getCurrentChatid
        console.log(this.url.path());
        if(this.url.path().includes('/channel')){
          this.channelService.getChannels().subscribe( c => {
            this.channels = c;
            this.currentChannel = this.channels[this.pathId];
            this.messageService.setUpMsgs(this.currentChannel.id);
            this.messageService.getMessages().subscribe( m => {
              this.messages = m;
            }) 
          }) 
        }else if(this.url.path().includes('/dm')){
          this.channelService.getDms().subscribe( c => {
            this.dms = c;
            this.currentDm = this.dms[this.pathId];
            this.messageService.setUpMsgs(this.currentDm.id);
            this.messageService.getMessages().subscribe( m => {
              this.messages = m;
            }) 
          }) 
        }
      })
    });    
  }

}
