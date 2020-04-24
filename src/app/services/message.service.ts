import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
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
    return this.http.delete<number>(environment.apiURL+'msg/' + msgId).pipe( 
      tap(_ => console.log("deleting mesage with id: "+msgId+"..."))
    );
  }

  agreeEmoji(emojiId:number, msgId:number): Observable<Message>{
    return this.http.put<Message>(environment.apiURL+'msg/add/'+emojiId+"/to/"+msgId, {}).pipe( 
      tap(_ => console.log("you increment some emoji count")),
    );
  }

  reactEmoji(emojiId:number, msgId:number): Observable<Message>{
    return this.http.put<Message>(environment.apiURL+'msg/react/'+msgId+"/with/"+emojiId, {}).pipe( 
      tap(_ => console.log("you react a message with an emoji")),
      catchError(this.handleError<Message>(`OOPS`,null))
    );
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {  
      console.error(error);   
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }


}
