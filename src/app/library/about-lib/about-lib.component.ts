import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router }              from '@angular/router';
import {LibraryService, Publication} from '../../shared';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-about-lib',
  templateUrl: './about-lib.component.html'
})
export class AboutLibComponent implements OnInit,  OnDestroy {
  
  publications: Publication[];
  sub:Subscription;
  tallyTypes;
  doneLoading:boolean = false;
  //type
  books:number;
  articles:number;
  reports:number;
  documents:number;
  news:number;
  anthologies:number;
  //themes
  laws:number;
  politics:number;
  histories:number;
  technologies:number;
  strategies:number;
  ethics:number;
  //topics
  drones:number;
  proliferation:number;
  data:number;
  targeted:number;

  turkey:number;
  pakistan:number;
  israel:number;
  constructor(
    private router: Router,
    private libraryService:LibraryService
  ) { }

  ngOnInit():void {
    // Immedialtey initiates list of publications
    this.getPublications();
  }
    // function to get list of publications
  getPublications(){
   this.sub = this.libraryService.getPublications()
      .subscribe(
        publications => this.publications = publications,
        error => console.log('error getting publications'),
          () => {
            this.count(this.publications);
            this.doneLoading = true;
          }
        ) 
  }
  count(types) {
    let bookCount = 0;
    let articleCount = 0;
    let reportCount = 0;
    let documentCount = 0;
    let newsCount = 0;
    let anthologiesCount = 0;
    //themes
    let lawCount = 0;
    let politicCount = 0;
    let historyCount = 0;
	let technologyCount = 0;
	let strategyCount = 0;
	let ethicCount = 0;
	//Topics
	let droneCount = 0;
	let dataCount = 0;
	let targetedCount = 0;
	let proCount = 0;

	let pakCount = 0;
	let turkCount = 0;
	let israelCount = 0;
    for (let i=0; i<types.length; i++) {
       if(types[i].pubType != null){
        if(types[i].pubType.toLowerCase() == 'book') {
          bookCount++;
          
        }
        if(types[i].pubType.toLowerCase() == 'article') {
          articleCount++;
          
        }
        if(types[i].pubType.toLowerCase() == 'report') {
          reportCount++;
          
        }
        if(types[i].pubType.toLowerCase() == 'document') {
          documentCount++;
          
        }
        if(types[i].pubType.toLowerCase() == 'news report') {
          newsCount++;
          
        }
        if(types[i].pubType.toLowerCase() == 'anthology') {
          anthologiesCount++;
          
        }

         for (let themeIndex=0; themeIndex<types[i].themes.length; themeIndex++) {
           if(types[i].themes[themeIndex].toLowerCase() == 'law') {
              lawCount++;
              
            }
			if(types[i].themes[themeIndex].toLowerCase() == 'politics') {
              politicCount++;
              
            }
			if(types[i].themes[themeIndex].toLowerCase() == 'history') {
              historyCount++;
              
            }
			if(types[i].themes[themeIndex].toLowerCase() == 'technology') {
              technologyCount++;
              
            }
			if(types[i].themes[themeIndex].toLowerCase() == 'strategy') {
              strategyCount++;
              
            }
			if(types[i].themes[themeIndex].toLowerCase() == 'ethics') {
              ethicCount++;
              
            }
         }
		 for (let topicIndex=0; topicIndex<types[i].topics.length; topicIndex++) {
           if(types[i].topics[topicIndex].toLowerCase() == 'drones') {
              droneCount++;
              
            }
			if(types[i].topics[topicIndex].toLowerCase() == 'data') {
              dataCount++;
              
            }
			if(types[i].topics[topicIndex].toLowerCase() == 'targeted killing') {
              targetedCount++;
              
            }
			if(types[i].topics[topicIndex].toLowerCase() == 'proliferation') {
              proCount++;
              
            }
			if(types[i].topics[topicIndex].toLowerCase() == 'pakistan') {
              pakCount++;
              
            }
			if(types[i].topics[topicIndex].toLowerCase() == 'turkey') {
              turkCount++;
              
            }
			if(types[i].topics[topicIndex].toLowerCase() == 'israel') {
              israelCount++;
              
            }
         }
       }
    }
    this.books = bookCount;
    this.articles = articleCount;
    this.reports = reportCount;
    this.documents = documentCount;
    this.news = newsCount;
    this.anthologies = anthologiesCount;
    //themes
    this.laws = lawCount;
    this.politics = politicCount;
    this.histories = historyCount;
	this.technologies = technologyCount;
	this.strategies = strategyCount;
	this.ethics = ethicCount;
	//Topics
	this.drones = droneCount;
	this.data = dataCount;
	this.targeted = targetedCount;
	this.proliferation = proCount;

	this.pakistan = pakCount;
	this.turkey = turkCount;
	this.israel = israelCount;
  }
    ngOnDestroy(){
      this.sub.unsubscribe();
  }
  gotoLibrary(){
    let link = ['library/publications'];
    this.router.navigate(link);
  }
}
