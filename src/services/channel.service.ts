import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient  } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Channel } from '../models/channel';

@Injectable({
  providedIn: 'root'
})
export class ChannelService {
  constructor(private http: HttpClient) { }

  getAllChannel(): Observable<Iterable<Channel>>{
    return this.http.get<Iterable<Channel>>("http://localhost:8080/channel/all/m/1");
  }

}
