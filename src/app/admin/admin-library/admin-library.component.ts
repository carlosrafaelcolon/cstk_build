import { Component, OnInit, OnDestroy  } from '@angular/core';
import { Router }              from '@angular/router';
import {LibraryService, Publication, FilterLibraryPipe, CapitalizePipe,  AuthService} from '../../shared';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-admin-library',
  templateUrl: './admin-library.component.html'
})
export class AdminLibraryComponent implements OnInit,  OnDestroy {
  publications: Publication[];
  loadingComplete:boolean = false;
  sub:Subscription;
  public themes;
  public topics;
  public countries;
  theme;
  topic;
  country;
  constructor(
    private router: Router,
    private libraryService:LibraryService,
    private auth:AuthService
  ) { }

  ngOnInit():void {
    // Immedialtey initiates list of publications
        this.getPublications();
    //retrieve library options
    this.topics = this.libraryService.topics;
    this.themes = this.libraryService.themes;
    this.countries = this.libraryService.countries;

    //preselect a value
    this.theme = this.themes[0].value;
    this.topic = this.topics[0].value;
    this.country = this.countries[0].value;
  }

  // function to get list of publications
  getPublications(){
   this.sub = this.libraryService.getPublications()
      .subscribe(
            publications => this.publications = publications,
            error => console.log('error getting publications'),
            () => this.loadingComplete = true
          ) 
  }

    // Delete a specific person
    onRemove(publication){
    
		if(this.auth.isAdmin()){
		let r = confirm('Are you sure you want to delete this publication?');
		if (r == true) {
				this.loadingComplete = false;
				this.libraryService.removePublication(publication)
				.subscribe(
				() => this.getPublications(),
				error => console.log('error deleting publication'),
				() => this.loadingComplete = true
					);
			} else {
				alert('Publication Not Deleted!')
			}
		} else{
			alert('You are not authorized to delete publications');
		}



	}

  // Navigate to create page
  onSelectCreate() {
    let link = ['/admin/library/create'];
    this.router.navigate(link);
  }
  // Navigate to edit page
  onEdit(publication): void {
    let link = ['/admin/library/edit/', publication.pubId];
    this.router.navigate(link);
  }
  trackPublication(index, publication) {
      return publication ? publication.pubId : undefined;
  }
  reset(term){
    for (const prop in term) {
   
      term[prop] = null;
    // `prop` contains the name of each property, i.e. `'code'` or `'items'`
    // consequently, `data[prop]` refers to the value of each property, i.e.
    // either `42` or the array
    }
  }
  ngOnDestroy(){
      this.sub.unsubscribe();
  }

}
