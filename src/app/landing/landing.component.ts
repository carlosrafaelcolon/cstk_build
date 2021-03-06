import { Component, OnInit, OnDestroy, ElementRef} from '@angular/core';
import { Router} from '@angular/router';
import {StrikeService, Strike,  BlogService, Post, HelperService} from '../shared';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit, OnDestroy   {
	headline = '<em>Counter Jihad</em> by <strong>Brian Glyn Williams</strong> Available Now!'
	homeValue = 1;
	id;
	scrollUp;
	strikes:Strike[];
	posts:Post[];
	loadingStrikesComplete:boolean = false;
	loadingPostsComplete:boolean = false;
	subPost:Subscription;
  	subStrike:Subscription;
	constructor(
		private router: Router,
		private element: ElementRef,
		private blogService:BlogService,
		private help:HelperService,
		private strikeService:StrikeService) { 
			 this.scrollUp = this.router.events.subscribe((path) => {
				element.nativeElement.scrollIntoView();
    		});
	}

	ngOnInit() {
		this.getLatest();
		// this.getBlog();
		this.id = setInterval(() => {
			this.quoteDisplay(this.homeValue); 
		}, 17000);
	}
	getLatest(){
    this.subStrike =	this.strikeService.getOperations()
      .subscribe(
          strikes => {
			  this.strikes = strikes.map(strike => 
                    Object.assign({}, strike, {
                      date: new Date(strike.date).toLocaleDateString('en-US', this.help.noWeekday)
                    })
                  )
			},
          error => console.log('error loading strikes'),
          () => this.loadingStrikesComplete = true
        ); 

    this.subPost= this.blogService.getBlogs()
				.subscribe(
          posts => {
          this.posts = posts.map(post => 
                    Object.assign({}, post, {
                      date: new Date(post.date).toLocaleDateString('en-US', this.help.noWeekday)
                    })
                  )
          },
          error => console.log('error getting posts'),
          () => this.loadingPostsComplete = true
				) ;
    
	}

	gotoStrike(strike) {

		let link = ['/operations/featured/', strike.strikeId];
		this.router.navigate(link);
		
	};
	gotoDatabase() {

		let link = ['/operations'];
		this.router.navigate(link);
		
	};
	gotoPost(post){
		let link = ['/blog/post/', post.slug];
		this.router.navigate(link);
	}
	gotoBlog(){
		let link = ['/blog'];
		this.router.navigate(link);
	}
	gotoArticle(){
		let link = ['/blog/post/counter-jihad'];
		this.router.navigate(link);
	}
	quoteDisplay(value){
		if(value == 1){
			this.homeValue = 2;
			
			
		}
		if(value == 2){
			this.homeValue = 3;
			
		}
		if(value == 3){
			this.homeValue = 1;
			
		}
	}
	ngOnDestroy() {
		if (this.id) {
		clearInterval(this.id);
		}
		this.subPost.unsubscribe();
    this.subStrike.unsubscribe();

	} 
}
