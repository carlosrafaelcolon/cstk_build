import { Component, OnInit } from '@angular/core';
import { Router }              from '@angular/router';
import {FormGroup, FormControl, FormArray, Validators, FormBuilder} from '@angular/forms';
import {LibraryService, Publication, HelperService } from '../../../shared';
import {ComponentCanDeactivate} from '../../user-edit.guard';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import * as moment from 'moment';
@Component({
  selector: 'app-admin-library-create',
  templateUrl: './admin-library-create.component.html'
})
export class AdminLibraryCreateComponent implements OnInit,  ComponentCanDeactivate {

  today = new Date().toJSON();
  formattedDate = moment.utc(this.today).format('YYYY-MM-DD');
  postForm: FormGroup;
  done = false;
  themeSelections;
  pubTypeSelections
  selectedTheme;
  selectedPubType;
    constructor(
        private router: Router,
        private libraryService: LibraryService,
        private help:HelperService,
        private fb:FormBuilder){}

    ngOnInit(){
        this.themeSelections = this.libraryService.themeSelection;
        this.selectedTheme = this.themeSelections[0].value;

        this.pubTypeSelections = this.libraryService.pubTypeSelection;
        this.selectedPubType = this.pubTypeSelections[0].value;
        // Initializing Route Param Data
        this.initForm();
     //   this.isVisible = true;
    }

    // function for this.initForm found in ngOnInit section
    private initForm() {
        this.postForm = this.fb.group({
            'title': [null, Validators.required],
            'authors': this.fb.array([
                // ['', Validators.required]
            ]),
            'pubDate': [this.formattedDate, Validators.required],
            'publisher': [null],
            'pageCount': [null],
            'pubType': [this.selectedPubType],
            'link': [null],
            'themes': this.fb.array([
                // [this.selectedTheme, Validators.required]
            ]),
            'topics': this.fb.array([
                // ['', Validators.required]
            ]),
            'summary': [null],
            'reviewed': [false],
            'reviews':  this.fb.array([
            //   this.fb.group({
            //     'reviewer': [''],
            //     'reviewTitle': [''],
            //     'reviewLink': ['']
            //   })
            ])
        });
    }
    
    // navigate to library-list page
    gotoLibrary() { this.router.navigate(['/admin/library']); }
    goTo(location: string): void {
        window.location.hash = location;
    }
    // submit values to create data
    onSubmit(value: any){

        this.libraryService.addPublication(value)
        .subscribe(
                data =>  alert('Publication successfully added!'),
                error => console.error("Error adding publication!"),
                ()=>  {
                    this.done =true;
                    this.gotoLibrary();
                }
            );
    }
    //Get, Push & Delete Themes
    get themes(): FormArray { return this.postForm.get('themes') as FormArray; }
    addTheme() { this.themes.push(new FormControl(this.selectedTheme, Validators.required)); }
    removeTheme(i: number) { this.themes.removeAt(i); }

    //Get, Push & Delete Topics
    get topics(): FormArray { return this.postForm.get('topics') as FormArray; }
    addTopic() { this.topics.push(new FormControl(null, Validators.required)); }
    removeTopic(i: number) { this.topics.removeAt(i); }


    //Get, Push & Delete Authors
    get authors(): FormArray { return this.postForm.get('authors') as FormArray; }
    addAuthor() { this.authors.push(new FormControl(null, Validators.required)); }
    removeAuthor(i: number) { this.authors.removeAt(i); }

    //Get, Push & Delete Reviews
    get reviews(): FormArray { return this.postForm.get('reviews') as FormArray; }
    addReview() { this.reviews.push(
                      new FormGroup({
                          'reviewer': new FormControl(null, Validators.required),
                          'reviewTitle': new FormControl(null, Validators.required),
                          'reviewLink': new FormControl(null, Validators.required)
                      }) ); }
    removeReview(i: number) { this.reviews.removeAt(i); }

    canDeactivate():  Observable<boolean> | boolean {
        if(!this.done){
            return confirm(this.help.leave);
        }
        return true
    }
  
}
