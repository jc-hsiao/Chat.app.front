import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { WelcomeComponent } from 'src/app/components/welcome/welcome.component'
import { ProfileComponent } from 'src/app/components/profile/profile.component'

const routes: Routes = [
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  {
    path: 'welcome', 
    component: WelcomeComponent
  },
  {
    path: 'profile', 
    component: ProfileComponent
  }
  //,
  // {
  //   path: 'folder/:id',
  //   loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  // }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    IonicModule,//this is important
  ],
  exports: [RouterModule],
  declarations: [WelcomeComponent,ProfileComponent]
})
export class AppRoutingModule {}
