import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChannelService } from '../../services/channel.service';
import { RouterEvent, NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { ChannelPage } from 'src/models/channelPage';
import { MessageService } from 'src/services/message.service';
import { Message } from 'src/models/message';
import { Channel } from 'src/models/channel';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit, OnDestroy{

  constructor(
    private channelService: ChannelService, 
    private messageService: MessageService,
    private router: Router)
     { }

  public destroyed =  new Subject<ChannelPage>();
  public pageTitle: string = "";
  public messages: Iterable<Message> = [];
  //public currentChannel:Channel = new Channel();
  public currentChannelIndex:number  ;


  ngOnInit() {
    this.router.events.pipe(
      filter((event: RouterEvent) => event instanceof NavigationEnd),
      takeUntil(this.destroyed)
    ).subscribe(() => {
      //this.channelService.currentChannelIndex
      this.pageTitle = this.channelService.currentChannel.name;    
      console.log("id: "+this.channelService.currentChannel.id);  
      this.messageService.setupChannelMsg(this.channelService.currentChannel.id);
      this.messages = this.messageService.messages;
    });
  }

  ngOnDestroy(){
    this.destroyed.next();
    this.destroyed.complete();
  }

}
