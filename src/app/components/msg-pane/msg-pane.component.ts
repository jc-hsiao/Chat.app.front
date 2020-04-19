import { Component, OnInit } from '@angular/core';
import { ChannelService} from 'src/app/services/channel.service';
import { UserService} from 'src/app/services/user.service';
import { MessageService} from 'src/app/services/message.service';

import { User } from 'src/app/models/user';
import { Channel } from 'src/app/models/channel';
import { Message } from 'src/app/models/message';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-msg-pane',
  templateUrl: './msg-pane.component.html',
  styleUrls: ['./msg-pane.component.scss'],
})
export class MsgPaneComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

}
