import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Emoji } from 'src/app/models/emoji'

@Injectable({
  providedIn: 'root'
})
export class EmojiService {

  emojis: Observable<Emoji[]> = new Observable<Emoji[]>();

  constructor(private http: HttpClient) { }

  setUpAllEmoji(){
    this.emojis = this.http.get<Emoji[]>(environment.apiURL+'emoji/all').pipe( 
      tap(_ => console.log("fetching all emoji"))
    );
  }

  getEmojis(){
    return this.emojis;
  }

}
