import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Channel } from 'src/app/models/channel'

@Injectable({
  providedIn: 'root'
})
export class ChannelService {

  channels: Observable<Iterable<Channel>> = new Observable<Iterable<Channel>>();

  constructor(private http: HttpClient) { }

  setUpChannels(userId:number){
    this.channels = this.http.get<Iterable<Channel>>(environment.apiURL+'channel/all/m/' + userId).pipe( 
      tap(_ => console.log("fetching channels..."))
    );
  }

  getChannels(){
    return this.channels;
  }



}
