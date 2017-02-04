import { Component  } from '@angular/core';
import { AuthService } from '../shared';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html'
})
export class AdminComponent  {

	userName:string;
	userIMG;


	constructor(private authService: AuthService) {
		this.userName = this.authService.userProfile.user_metadata.name;
		this.userIMG = this.authService.userProfile.user_metadata.img;
	}


	
	goTo(location: string): void {
		window.location.hash = location;
	}
}
