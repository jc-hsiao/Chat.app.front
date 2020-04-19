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
  messages: Observable<Iterable<Message>> = new Observable<Iterable<Message>>();

  constructor(private http: HttpClient) { }

  setUpMsgs(channelId:number){
    this.messages = this.http.get<Iterable<Message>>(environment.apiURL+'msg/allByChat/' + channelId).pipe( 
      tap(_ => console.log("fetching messages for channel"+channelId))
    );
  }

  getMessages(){
    return this.messages;
  }
}
