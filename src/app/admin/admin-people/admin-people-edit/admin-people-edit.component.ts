import { Component, OnInit, OnDestroy  } from '@angular/core';
import { Router, ActivatedRoute }              from '@angular/router';
import {FormGroup, FormControl, FormArray, Validators, FormBuilder} from '@angular/forms';
import {PeopleService, People, HelperService} from '../../../shared';
import {ComponentCanDeactivate} from '../../user-edit.guard';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-admin-people-edit',
  templateUrl: './admin-people-edit.component.html'
})
export class AdminPeopleEditComponent implements OnInit, OnDestroy, ComponentCanDeactivate {
  updateForm: FormGroup;

  private person: People;
  private subscription: Subscription;
  done = false;
  constructor(
        private route: ActivatedRoute,
        private router: Router,
        private peopleService: PeopleService,
        private help:HelperService,
        private fb:FormBuilder){}

  ngOnInit(){
    // Initializing Route Param Data
    this.subscription = this.route.params.subscribe(params => {
        let id = Number.parseInt(params['staffId']);

        this.peopleService
            .getPerson(id)
            .subscribe(
                    data => this.person = data,
                    error => console.log('error getting details'),
                    () => this.initForm()
                );
      });

  }
  // function for this.initForm found in ngOnInit section
    private initForm() {
      let personPublication: FormArray = new FormArray([]);
        for (let i = 0; i < this.person.publication.length; i++) {
            personPublication.push(
                new FormGroup({
                    pubName: new FormControl(this.person.publication[i].pubName, Validators.required),
                    link: new FormControl(this.person.publication[i].link, Validators.required)
                })
        );
      }
      this.updateForm = this.fb.group({
        '_id':[this.person._id, Validators.required],
        'name': [this.person.name, Validators.required],
        'title': [this.person.title],
        'img': [this.person.img],
        'avatar':[this.person.avatar],
        'email': [this.person.email],
        'twitter': [this.person.twitter],
        'github': [this.person.github],
        'website': [this.person.website],
        'shortBio': [this.person.shortBio],
        'bio': [this.person.bio],
        'publication': personPublication
      });
    }

    //Get, Push & Delete Themes
    get publications(): FormArray { return this.updateForm.get('publication') as FormArray; }
    addPublication() { this.publications.push(
                                    new FormGroup({
                                        'pubName': new FormControl('', Validators.required),
                                        'link': new FormControl('',  Validators.required)
                                    })
                                ); }
    removePublication(i: number) { this.publications.removeAt(i); }



    // navigate to people-list page
    gotoPeoples() { this.router.navigate(['/admin/people']); }


     goTo(location: string): void {
        window.location.hash = location;
    }

    // submit values to create data
    onSubmit(value: any){
     
        this.peopleService.updatePerson(value)
        .subscribe(
            data =>  alert('Data successfully updated!'),
            error => console.error("Error updating person!"),
            ()=>  {
                    this.done =true;
                    this.router.navigate(['/admin/people']);
                }
        );
    }
    // unsubscribe to prevent memory leaks
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    canDeactivate():  Observable<boolean> | boolean {
      if(!this.done){
          return confirm(this.help.leave);
      }
      return true
    }

}
