import { Component} from '@angular/core';
import { Router }              from '@angular/router';

@Component({
  selector: 'app-operation-landing',
  templateUrl: './operation-landing.component.html'
})
export class OperationLandingComponent {




    constructor(
        private router: Router
    ) { }

   
    // Navigate to detail page
    gotoPakistan(): void {
        let link = ['/operations/pakistan'];
        this.router.navigate(link);
    }

    // Navigate to detail page
    gotoYemen(): void {
        let link = ['/operations/yemen'];
        this.router.navigate(link);
    }

    // Navigate to detail page
    gotoSomalia(): void {
        let link = ['/operations/somalia'];
        this.router.navigate(link);
    }

    // Navigate to detail page
    gotoIsrael(): void {
        let link = ['/operations/israel'];
        this.router.navigate(link);
    }
    // Navigate to detail page
    gotoTurkey(): void {
        let link = ['/operations/turkey'];
        this.router.navigate(link);
    }
    // Navigate to detail page
    gotoSearch(): void {
        let link = ['/operations/search'];
        this.router.navigate(link);
    }
 
}
