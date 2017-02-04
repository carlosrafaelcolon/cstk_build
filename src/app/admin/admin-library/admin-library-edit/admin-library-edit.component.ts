import { Component, OnInit, OnDestroy  } from '@angular/core';
import { Router,  ActivatedRoute}              from '@angular/router';
import {FormGroup, FormControl, FormArray, Validators, FormBuilder} from '@angular/forms';
import {LibraryService, Publication, HelperService} from '../../../shared';
import {ComponentCanDeactivate} from '../../user-edit.guard';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import * as moment from 'moment';
@Component({
  selector: 'app-admin-library-edit',
  templateUrl: './admin-library-edit.component.html'
})
export class AdminLibraryEditComponent implements OnInit, OnDestroy, ComponentCanDeactivate{
    updateForm: FormGroup;
    private publication: Publication;
    private subscription: Subscription;
    done = false;


    constructor(
            private route: ActivatedRoute,
            private router: Router,
            private libraryService: LibraryService,
            private help:HelperService,
            private fb:FormBuilder
        ){}
    
    
    ngOnInit(){
        // Initializing Route Param Data
        this.subscription = this.route.params.subscribe(params => {
            let id = Number.parseInt(params['pubId']);
            this.libraryService
                .getPublication(id)
                .subscribe(
                        p => this.publication = p,
                        error => console.log('error getting details'),
                        () => this.initForm()
                    );
        });

    }

    // function for this.initForm found in ngOnInit section
    private initForm() {
        let themeArray: FormArray = new FormArray([]);
        let topicArray: FormArray = new FormArray([]);
        let authorArray: FormArray = new FormArray([]);
        let reviewArray: FormArray = new FormArray([]);
        // loop for theme array
        for (let i = 0; i < this.publication.themes.length; i++) {
            themeArray.push(
                new FormControl(this.publication.themes[i], Validators.required)
            );
        };

        //loop for topic array
        for (let i = 0; i < this.publication.topics.length; i++) {
            topicArray.push(
                new FormControl(this.publication.topics[i], Validators.required)
            );
        };

        // loop for author array
        for (let i = 0; i < this.publication.authors.length; i++) {
            authorArray.push(
                new FormControl(this.publication.authors[i], Validators.required)
            );
        };
        if (this.publication.hasOwnProperty('reviews')) {
            for (let i = 0; i < this.publication.reviews.length; i++) {
            reviewArray.push(
                new FormGroup({
                    
                    'reviewer': new FormControl(this.publication.reviews[i].reviewer),
                    'reviewTitle': new FormControl(this.publication.reviews[i].reviewTitle),
                    'reviewLink': new FormControl(this.publication.reviews[i].reviewLink)
                })
            );
            }
        }
        // update form with data binding
        this.updateForm = this.fb.group({
            '_id': [this.publication._id, Validators.required],
            'title': [this.publication.title, Validators.required],
            'themes': themeArray,
            'topics': topicArray,
            'pubDate': [ moment.utc(this.publication.pubDate).format('YYYY-MM-DD'), Validators.required],
            'pubType': [this.publication.pubType],
            'authors': authorArray,
            'publisher': [this.publication.publisher],
            'pageCount': [this.publication.pageCount],
            'summary': [this.publication.summary],
            'link': [this.publication.link],
            'reviewed': [this.publication.reviewed, Validators.required],
            'reviews':  reviewArray
        });
    }

       //Get, Push & Delete Themes
    get themes(): FormArray { return this.updateForm.get('themes') as FormArray; }
    addTheme() { this.themes.push(new FormControl('', Validators.required)); }
    removeTheme(i: number) { this.themes.removeAt(i); }

    //Get, Push & Delete Topics
    get topics(): FormArray { return this.updateForm.get('topics') as FormArray; }
    addTopic() { this.topics.push(new FormControl('', Validators.required)); }
    removeTopic(i: number) { this.topics.removeAt(i); }


    //Get, Push & Delete Authors
    get authors(): FormArray { return this.updateForm.get('authors') as FormArray; }
    addAuthor() { this.authors.push(new FormControl('', Validators.required)); }
    removeAuthor(i: number) { this.authors.removeAt(i); }

    //Get, Push & Delete Reviews
    get reviews(): FormArray { return this.updateForm.get('reviews') as FormArray; }
    addReview() { this.reviews.push(
                      new FormGroup({
                          'reviewer': new FormControl('', Validators.required),
                          'reviewTitle': new FormControl('', Validators.required),
                          'reviewLink': new FormControl('', Validators.required)
                      }) ); }
    removeReview(i: number) { this.reviews.removeAt(i); }

    // navigate to people-list page
    gotoLibrary() { this.router.navigate(['/admin/library']); }
    goTo(location: string): void {
        window.location.hash = location;
    }
    // submit values to update data
    onSubmit(value: any){
    
        this.libraryService.updatePublication(value)
            .subscribe(
                data =>  alert('Data successfully updated!'),
                error => console.error("Error updating publication!"),
                ()=>  {
                    this.done =true;
                    this.gotoLibrary();
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
