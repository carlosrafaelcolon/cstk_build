import { Component, OnInit  } from '@angular/core';
import { Router }              from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../shared';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html'
})
export class AdminComponent implements OnInit {

	userName:string;
	userIMG;


	constructor(
		private authService: AuthService,
		private router: Router
	) { }

	// logIn() {
	// 	this.authService.login();
	// }

	logOut() {
		this.router.navigate(['/']);
		this.authService.logout();
		
	}
	ngOnInit() {
		// this.userName = this.authService.userProfile.nickname;
		// this.userIMG = this.authService.userProfile.picture;

			this.userName = this.authService.userProfile.user_metadata.name;
		this.userIMG = this.authService.userProfile.user_metadata.img;
	}
	goTo(location: string): void {
		window.location.hash = location;
	}
}
