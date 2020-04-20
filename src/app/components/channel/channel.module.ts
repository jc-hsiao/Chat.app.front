import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ChannelComponent } from 'src/app/components/channel/channel.component';
import { DmComponent } from 'src/app/components/dm/dm.component';
import { MsgPaneComponent } from 'src/app/components/msg-pane/msg-pane.component';
import { PostPaneComponent } from 'src/app/components/post-pane/post-pane.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  declarations: [ChannelComponent,DmComponent,MsgPaneComponent,PostPaneComponent]
})
export class ChannelModule {
}
