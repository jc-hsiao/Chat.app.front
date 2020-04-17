import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChannelService } from '../../services/channel.service';
import { RouterEvent, NavigationEnd, Router } from '@angular/router';
import { Channel } from 'src/models/channel';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { ChannelPage } from 'src/models/channelPage';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit, OnDestroy{

  constructor(private channelServices: ChannelService,private router: Router) { }

  public destroyed =  new Subject<ChannelPage>();
  public pageTitle: string = "";


  ngOnInit() {
    this.router.events.pipe(
      filter((event: RouterEvent) => event instanceof NavigationEnd),
      takeUntil(this.destroyed)
    ).subscribe(() => {
      this.pageTitle = this.channelServices.currentChannel.name;
      
    });
  }

  ngOnDestroy(){
    this.destroyed.next();
    this.destroyed.complete();
  }

}
