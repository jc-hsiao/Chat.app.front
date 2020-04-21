import { NgModule, OnInit } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { WelcomeComponent } from 'src/app/components/welcome/welcome.component'
import { ProfileComponent } from 'src/app/components/profile/profile.component'
import { ChannelComponent } from 'src/app/components/channel/channel.component'
import { DmComponent } from 'src/app/components/dm/dm.component'
import { ChannelModule } from 'src/app/components/channel/channel.module'


const routes: Routes = [
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  {
    path: 'welcome', 
    component: WelcomeComponent
  },
  {
    path: 'profile', 
    component: ProfileComponent
  },
  {
    path: 'channel/:id',
    component: ChannelComponent
  },
  {
    path: 'dm/:id',
    component: DmComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    IonicModule,//this is important
    ChannelModule
  ],
  exports: [RouterModule],
  declarations: [WelcomeComponent,ProfileComponent]
})
export class AppRoutingModule{
}
