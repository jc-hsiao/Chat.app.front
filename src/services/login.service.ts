import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { User } from '../models/user';
import { ChannelService } from '../services/channel.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  public currentUser: User = new User();

  constructor(
    private http: HttpClient,
    private channelService: ChannelService) { 
      this.login(1);
    }
  
  login(id){
    this.http.get<User>("http://localhost:8080/user/"+id).subscribe(user => {
      this.currentUser = user;
      this.channelService.setup(id);
    })
  }
  getUser(): User{
    return this.currentUser;
  }

}
