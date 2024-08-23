import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit{

  constructor(private auth : AuthService) {}

  ngOnInit(): void {     
  }

  Logout() {
    this.auth.logout();
  }
}
