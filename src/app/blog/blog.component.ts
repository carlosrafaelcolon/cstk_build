import { Component, ElementRef} from '@angular/core';
import { Router }              from '@angular/router';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html'
})
export class BlogComponent  {
  scrollUp;
  constructor(
    private router: Router,
    private element: ElementRef) { 
      this.scrollUp = this.router.events.subscribe((path) => {
				element.nativeElement.scrollIntoView();
    		});
    }

}
