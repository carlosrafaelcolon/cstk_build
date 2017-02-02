import { Component, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html'
})
export class AboutComponent {
  scrollUp;
  constructor(
    private router: Router,
		private element: ElementRef) { 
			this.scrollUp = this.router.events.subscribe((path) => {
				element.nativeElement.scrollIntoView();
    		});
	}


}
