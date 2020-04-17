import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { User } from 'src/models/user';


@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.page.html',
  styleUrls: ['./userinfo.page.scss'],
})
export class UserinfoPage implements OnInit {

  constructor(private loginService:LoginService) { }

  currentUser: User = new User();

  ngOnInit() {
    this.currentUser = this.loginService.getUser();
  }

}
