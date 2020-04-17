import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient  } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Channel } from '../models/channel';
import { DM } from '../models/dm';
import { ChannelPage } from 'src/models/channelPage';
@Injectable({
  providedIn: 'root'
})
export class ChannelService {
  constructor(private http: HttpClient) { }

  currentChannel: Channel = new Channel();
  currentDM: DM = new DM();
  
  channelList: Iterable<Channel> = [];
  dmList: Iterable<DM> = [];
  public channelPages: ChannelPage[] = [];
  public dmPages = [];
  


  setup(id){
    this.http.get<Iterable<Channel>>("http://localhost:8080/channel/all/m/"+id).subscribe(chs => {
      this.channelList = chs;
      this.mapChannelToChat();
    })  
    this.http.get<Iterable<DM>>("http://localhost:8080/dm/allByUser/"+id).subscribe(dms => {
      this.dmList = dms;
      this.mapDMToChat();
    })
  }


  getChannels():Iterable<Channel>{
    return this.channelList;
  }

  getDms():Iterable<DM>{
    return this.dmList;
  }

  setcurrentChannel(channelPage:ChannelPage){
    this.currentChannel = channelPage.channel;
    console.log(channelPage.channel.name+" saved, id="+channelPage.channel.id);
  }
  
  mapChannelToChat(){
    for (let ch of this.channelList) {
      var c = new ChannelPage();
      c.channel = ch;
      c.url = "chat-channel";
      this.channelPages.push(c);
    }    
    return this.channelPages;
  }

  mapDMToChat(){
    for (let d of this.dmList) {
      var dm = {
        title: "someDM",
        url: '/chat-dm'
      };
      this.dmPages.push(dm);
    }    
    return this.dmPages;
  }


}
