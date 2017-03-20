import { Component, OnDestroy } from '@angular/core';
import { AuthService } from '../shared';
@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html'
})
export class MainNavComponent implements OnDestroy{
  adminOn:boolean = false;
  libOn:boolean = false;

  constructor(private authService: AuthService) { }

  loadAdmin(){
		this.adminOn = true;
	}
  loadLib(){
		this.libOn = true;
	}
  ngOnDestroy(){
    this.adminOn = false;
    this.libOn = false;
  }
}
