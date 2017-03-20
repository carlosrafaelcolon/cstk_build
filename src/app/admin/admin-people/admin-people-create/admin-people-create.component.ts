import { Component, OnInit  } from '@angular/core';
import { Router }              from '@angular/router';
import {FormGroup, FormControl, FormArray, Validators, FormBuilder} from '@angular/forms';
import {PeopleService, People, HelperService } from '../../../shared';
import {ComponentCanDeactivate} from '../../user-edit.guard';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'app-admin-people-create',
  templateUrl: './admin-people-create.component.html'
})
export class AdminPeopleCreateComponent implements OnInit, ComponentCanDeactivate {
  
    postForm: FormGroup;
    done = false;
    constructor(
        private router: Router,
        private peopleService: PeopleService,
        private help:HelperService,
        private fb:FormBuilder){}
    
    
    ngOnInit(){
        // Initializing Route Param Data
        this.initForm();
    }
    
    // function for this.initForm found in ngOnInit section
    private initForm() {
        this.postForm = this.fb.group({
            'name': ['', Validators.required],
            'title': [''],
            'img': [''],
            'avatar':[''],
            'email': [''],
            'twitter': [''],
            'github': [''],
            'website': [''],
            'shortBio': [''],
            'bio': [''],
            'publication': this.fb.array([
            //   this.fb.group({
            //     'pubName': ['', Validators.required],
            //     'link': ['', Validators.required]
            //   })
            ])

        });
    }
    //Get, Push & Delete Themes
    get publications(): FormArray { return this.postForm.get('publication') as FormArray; }
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
        this.peopleService.addPerson(value)
        .subscribe(
            data =>  alert('Data successfully added!'),
            error => console.error("Error adding person!"),
            ()=>  {
                    this.done =true;
                    this.router.navigate(['/admin/people']);
                }
        );
    }
    canDeactivate():  Observable<boolean> | boolean {
      if(!this.done){
          return confirm(this.help.leave);
      }
      return true
    }

}
