import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private stompClient;

  constructor() {}


  //setup to listen
  initializeWebSocketConnection(){
    let ws = new SockJS(environment.apiURL+"socket");
    this.stompClient = Stomp.over(ws);
    // let that = this;
    // this.stompClient.connect({}, frame => {
    //   that.stompClient.subscribe("/pool", (message) => {
    //     console.log(message+"??????????");
    //   });
    // });
    return this.stompClient;
  }

  
  //talk
  sendMessage(userId:number, chatId:number, content:string){
    this.stompClient.send("/app/send/msg/"+userId+"/"+chatId, {}, content);
  }

  getStompClient(){
    return this.stompClient;
  }

  setStompClient(client){
    this.stompClient = client;
  }
  


}
