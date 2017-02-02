import { Component, OnInit, OnDestroy  } from '@angular/core';
import { Router }              from '@angular/router';
import {PeopleService, People, AuthService} from '../../shared';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-admin-people',
  templateUrl: './admin-people.component.html'
})
export class AdminPeopleComponent implements OnInit, OnDestroy {
  people: People[];
  loadinPeopleComplete:boolean = false;

  sub:Subscription
  constructor(
    private router: Router,
	  private auth:AuthService,
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
          errorr => console.log('error getting people!'),
          () => this.loadinPeopleComplete = true
        ) 
  }
  // Delete a specific person
    onRemove(person){
    
		if(this.auth.isAdmin()){
		let r = confirm('Are you sure you want to delete this person?');
		if (r == true) {
				  this.loadinPeopleComplete = false;
          this.peopleService.removePerson(person)
				.subscribe(
            () => this.getPeople(),
            error => console.log('error deleting person'),
            () => this.loadinPeopleComplete = true
					);
			} else {
				alert('Person Not Deleted!')
			}
		} else{
			alert('You are not authorized to delete people');
		}



	}



  // Navigate to create page
  onSelectCreate() {
    let link = ['admin/people/create'];
    this.router.navigate(link);
  }
  // Navigate to edit page
  onEdit(person): void {
    let link = ['/admin/people/edit/', person.staffId];
    this.router.navigate(link);
  }
  ngOnDestroy(){
      this.sub.unsubscribe();
  }
}
