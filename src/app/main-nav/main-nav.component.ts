import { Component } from '@angular/core';
import { AuthService } from '../shared';
@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html'
})
export class MainNavComponent {
  adminOn:boolean = false;
  libOn:boolean = false;

  constructor(private authService: AuthService) { }

  loadAdmin(){
		this.adminOn = true;
	}
  loadLib(){
		this.libOn = true;
	}
}
