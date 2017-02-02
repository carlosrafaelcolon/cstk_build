import { Component, OnInit, OnDestroy  } from '@angular/core';
import { Router }              from '@angular/router';
import {PeopleService, People} from '../../shared';
import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'app-people',
  templateUrl: './people.component.html'
})
export class PeopleComponent implements OnInit,  OnDestroy {
	people: People[];
	
	sub:Subscription;

	constructor(
	private router: Router,
	private peopleService:PeopleService) { }

	ngOnInit():void {
	// Immedialtey initiates list of people
		this.getPeople();
	}
	// function to get list of people
	getPeople(){
	this.sub = this.peopleService.getPeople()
		.subscribe(
			people => this.people = people,
			error => console.log('error getting people')
			) 
	}
	// Navigate to edit page
	onSelect(person): void {
		let link = ['about/people/', person.slug];
		this.router.navigate(link);
	}
	ngOnDestroy(){
		this.sub.unsubscribe();
	}

}
