import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router, Params} from '@angular/router';
import {PeopleService, People} from '../../shared';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html'
})
export class PersonComponent implements OnInit, OnDestroy {
    person: People;
    subscription: Subscription;
  constructor(
        private route: ActivatedRoute,
        private router: Router,
        private peopleService: PeopleService){}

  ngOnInit(){
        // Initializing Route Param Data
        this.subscription = this.route.params.subscribe(params => {
            let slug = params['slug'];
            this.peopleService
                .getSlug(slug)
                .subscribe(
                    p => this.person = p,
                    error => console.log('error getting person')
                );
        });

    }
    // navigate to people-list page
    gotoPeoples() { this.router.navigate(['/about/people']); }


    // unsubscribe to prevent memory leaks
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
