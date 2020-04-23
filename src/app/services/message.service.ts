import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Message } from 'src/app/models/message'

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: Observable<Message[]> = new Observable<Message[]>();

  constructor(private http: HttpClient) { }

  setUpMsgs(channelId:number){
    this.messages = this.http.get<Message[]>(environment.apiURL+'msg/allByChat/' + channelId).pipe( 
      tap(_ => console.log("fetching messages for channel"+channelId))
    );
  }

  getMessages(){
    return this.messages;
  }

  addNewMessage(userId:number, chatId:number, text:string): Observable<Message>{
    return this.http.post<Message>(environment.apiURL+'msg/'+userId+"/"+chatId, text).pipe( 
      tap(_ => console.log("added a new message to chat"+chatId)),
    );
  }

  deleteMsg(msgId:number){
    return this.http.delete<Message>(environment.apiURL+'msg/' + msgId).pipe( 
      tap(_ => console.log("deleting mesage with id: "+msgId+"..."))
    );
  }

}
