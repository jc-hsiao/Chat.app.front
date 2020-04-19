import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { MsgPaneComponent } from 'src/app/components/msg-pane/msg-pane.component';
import { ChannelComponent } from 'src/app/components/channel/channel.component';
import { DmComponent } from 'src/app/components/dm/dm.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  declarations: [ChannelComponent,DmComponent,MsgPaneComponent]
})
export class ChannelModule {
}
