import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders  } from '@angular/common/http'
import { Message } from 'src/models/message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient) {}

  public messages: Iterable<Message> = [];


  setupChannelMsg(channelId){
    this.http.get<Iterable<Message>>("http://localhost:8080/msg/allByChannel/"+channelId).subscribe(msg => {
      this.messages = msg;
    })      
  }

  setupDmMsg(dmId){
    this.http.get<Iterable<Message>>("http://localhost:8080/msg/allByDm/"+dmId).subscribe(msg => {
      this.messages = msg;
    })          
  }
}
