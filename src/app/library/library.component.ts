import { Component, ElementRef} from '@angular/core';
import { Router }              from '@angular/router';
import { AuthService } from '../shared';
@Component({
  selector: 'app-library',
  templateUrl: './library.component.html'
})
export class LibraryComponent {
  scrollUp;
  adminOn:boolean = false;
  constructor(
    private authService: AuthService,
    private router: Router,
		private element: ElementRef) { 
			this.scrollUp = this.router.events.subscribe((path) => {
				element.nativeElement.scrollIntoView();
    		});
	}
  loadAdmin(){
		this.adminOn = true;
	}

}
