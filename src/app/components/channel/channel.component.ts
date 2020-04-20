import { Component, OnInit } from '@angular/core';
import { ChatService} from 'src/app/services/chat.service';
import { UserService} from 'src/app/services/user.service';

import { User } from 'src/app/models/user';
import { Channel } from 'src/app/models/channel';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss'],
})
export class ChannelComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private chatService: ChatService,
    private userService: UserService) { }

  pathId: number;
  Channels: Iterable<Channel> = [];
  currentUser: User = new User();
  currentChannel: Channel = new Channel();

  ngOnInit() {
    //get id from path
    this.route.params.subscribe(params => {
      this.pathId = +params['id']; // (+) converts string 'id' to a number
      this.userService.getUser().subscribe( u => {
        this.currentUser = u;
        this.chatService.getChannels().subscribe( c => {
          this.Channels = c;
          this.currentChannel = this.Channels[this.pathId];
        })      
      })
    });    
  }

}
