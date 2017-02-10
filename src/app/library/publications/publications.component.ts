import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router }              from '@angular/router';
import {LibraryService, Publication, HelperService} from '../../shared';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-publications',
  templateUrl: './publications.component.html'
})
export class PublicationsComponent implements OnInit,  OnDestroy {
  
  publications: Publication[];
  sub:Subscription;
  result:number = 0;
  public themes;
  public topics;
  public countries;
  theme;
  topic;
  country;
  authors;
  books;
  articles;
  constructor(
    private router: Router,
    private help:HelperService,
    private libraryService:LibraryService) { 

    }
  

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
        publications => this.publications = publications.map(pub => 
                  Object.assign({}, pub, {
                      pubDate: new Date(pub.pubDate).toLocaleDateString('en-US', this.help.noWeekday)
                  })
              ),
        error => console.log('error getting publications')
        ) 
  }
  ngOnDestroy(){
      this.sub.unsubscribe();
  }
  // Navigate to edit page
  onSelect(publication): void {
    let link = ['library/publications/', publication.pubId];
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

    
  

}
