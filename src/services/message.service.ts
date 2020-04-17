import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient  } from '@angular/common/http'
import { Message } from 'src/models/message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient) {}

  public messages: Iterable<Message> = [];

  getAllMsgByChannel(id){
    this.http.get<Iterable<Message>>("http://localhost:8080/message/allByChannel/"+id).subscribe(msg => {
      this.messages = msg;
    })      
  }

  getAllMsgByDM(id){
    this.http.get<Iterable<Message>>("http://localhost:8080/message/allByDm/"+id).subscribe(msg => {
      this.messages = msg;
    })          
  }

  //allByChannel/{id}
  //allByDm/{id}
}
