import { Component, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared';
@Component({
  selector: 'app-operation',
  templateUrl: './operation.component.html'
})
export class OperationComponent  {
	scrollUp;
	adminOn:boolean = false;
  constructor(
    private router: Router,
		private authService: AuthService,
		private element: ElementRef) { 
			this.scrollUp = this.router.events.subscribe((path) => {
				element.nativeElement.scrollIntoView();
    		});
	}
 


  loadAdmin(){
		this.adminOn = true;
	}
}
