import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable,of } from 'rxjs';
import { tap,map } from 'rxjs/operators';
import { Channel } from 'src/app/models/channel'
import { DM } from 'src/app/models/dm'

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  chatId: Observable<number> = new  Observable<number>() ;
  channels: Observable<Iterable<Channel>> = new Observable<Iterable<Channel>>();
  dms: Observable<Iterable<DM>> = new Observable<Iterable<DM>>();

  constructor(private http: HttpClient) { }

  setUpChannels(userId:number){
    this.channels = this.http.get<Iterable<Channel>>(environment.apiURL+'channel/all/m/' + userId).pipe( 
      tap(_ => console.log("fetching channels..."))
    );
  }
  setUpDms(userId:number){
    this.dms = this.http.get<Iterable<DM>>(environment.apiURL+'dm/allByUser/' + userId).pipe( 
      tap(_ => console.log("fetching dms...")),
      map(ds => { 
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
      })
    );
  }

  createChannel(id:number,name:string){
    //@TODO 
  }

  createDM(currentUserId:number, targetUserId:number){
    //@TODO 

    console.log(currentUserId+" and "+targetUserId);
  }


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



}
