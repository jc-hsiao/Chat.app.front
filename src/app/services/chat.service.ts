import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable,of } from 'rxjs';
import { tap,map } from 'rxjs/operators';
import { Channel } from 'src/app/models/channel'
import { DM } from 'src/app/models/dm'
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  chatId: Observable<number> = new  Observable<number>() ;
  channels: Observable<Channel[]> = new Observable<Channel[]>();
  dms: Observable<DM[]> = new Observable<DM[]>();

  constructor(private http: HttpClient) { }

  setUpChannels(userId:number){
    this.channels = this.http.get<Channel[]>(environment.apiURL+'channel/all/m/' + userId).pipe( 
      tap(_ => console.log("fetching channels..."))
    );
  }
  setUpDms(userId:number){
    this.dms = this.http.get<DM[]>(environment.apiURL+'dm/allByUser/' + userId).pipe( 
      tap(_ => console.log("fetching dms...")),
      map(ds => { 
        return this.giveDmName(ds,userId);
      })
    );
  }

  //dive dm a name given a dm list and a current user id
  giveDmName(ds,userId){
    for(let d of ds){
      var str= ""
       for(let u of d.members){
         if(u.id != userId){
           str += u.displayName + ", "
         }
       }
       str = str.substring(0, str.length-2);
       d.name = str;
    }
    return ds;    
  }



  createChannel(userId:number,name:string){
    return this.http.post<Channel>(environment.apiURL+'channel/' + userId,name).pipe( 
      tap(_ => console.log("sned new channel data to server"))
    );
  }

  createDM(currentUserId:number, targetUser:User){
    var temp = new DM();
    return this.http.post<DM>(environment.apiURL+'dm/'+currentUserId+"/"+targetUser.id, temp).pipe( 
      tap(_ => console.log("sned new dm data to server")),
      map(d => { 
        d.name = targetUser.displayName;
        return d;
      })
    );  }

  getChannels(){
    return this.channels;
  }
  getDms(){
    return this.dms;
  }
  setCurrentChat(id:number){
    this.chatId = of(id);
  }
  getCurrentChatid(){
    return this.chatId;
  }

  e;
  
  setScrollEle(element){
    this.e = element;   
    console.log("got "+ element);
    console.log("height "+ element.scrollHeight);

  }

  // pleaseScroll(){
  //   console.log("huh?"+ JSON.stringify(this.scroll));
  //   this.chatService.setScrollEle(this.scroll);

  //   console.log(this.element.scrollTop+"!!!!!!!!!!"+this.element.scrollHeight);
  //   this.element.scrollTop = this.element.scrollHeight;     
  // }

}
