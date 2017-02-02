import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router, Params} from '@angular/router';
import {LibraryService, Publication} from '../../shared';
import { Subscription } from 'rxjs/Subscription';
import * as moment from 'moment';
@Component({
  selector: 'app-pub',
  templateUrl: './pub.component.html'
})
export class PubComponent implements OnInit, OnDestroy {
    private publication: Publication;
    subscription:Subscription;
    dateFormatted;
    options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone:'UTC' };
    constructor(
          private route: ActivatedRoute,
          private router: Router,
          private libraryService:LibraryService
          ) { }

    ngOnInit() {
        // Initializing Route Param Data
        this.subscription = this.route.params.subscribe(params => {
            let id = Number.parseInt(params['pubId']);
            this.libraryService
                .getPublication(id)
                    .subscribe(
                        data => {
                            this.publication = data,
                            this.dateFormatted =new Date(this.publication.pubDate).toLocaleDateString('en-US', this.options);
                        },
                        error => console.log('error loading')
                      );
        });
     }
     // unsubscribe to prevent memory leaks
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

      // Navigate to detail page
  gotoPublications(): void {
    let link = ['/library/publications'];
    this.router.navigate(link);
  }

}
