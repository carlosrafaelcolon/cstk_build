import { Component, OnInit, OnDestroy} from '@angular/core';
import { Router, ActivatedRoute, Params}              from '@angular/router';
import {BlogService, Post, CapitalizePipe, PeopleService, People} from '../../shared';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html'
})
export class PostComponent implements OnInit, OnDestroy {
	options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone:'UTC' };
	dateFormatted;
	post:Post;
	subscription: Subscription;
	person: People;
	userInfo;
	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private blogService:BlogService,
		private peopleService: PeopleService
	) { }

	ngOnInit(): void {
	   // Initializing Route Param Data
        this.subscription = this.route.params.subscribe(params => {
            let slug = params['slug'];
 
           this.blogService
                .getPost(slug)
                .subscribe(
                    post => {
						this.post = post;
						this.dateFormatted = new Date(this.post.date).toLocaleDateString('en-US', this.options);
					},
                    error => console.log('error getting post'),
					() => this.getBio()
                );
        });

  	}
	gotoBlog(){
		let link = ['/blog'];
		this.router.navigate(link);
	}
	gotoAuthor(user){
		let link = ['about/people/', user.slug];
		this.router.navigate(link);
	}
	getBio(){
		 if (this.post.hasOwnProperty('authors')) {
			 let bioResult = [];
			for (let i=0; i<this.post.authors.length; i++) {
				if(this.post.authors[i].authorId !== null) {
					this.peopleService
						.getPerson(this.post.authors[i].authorId)
						.subscribe(
							p => this.person = p,
							error => console.log('error getting person'),
							() => {
								// this.userInfo = this.person;
								bioResult.push(this.person);
								
							}
						);
					// console.log(this.post.authors[i].authorId)
					
				}
			}
			
			this.userInfo =  bioResult;
			
		 }
	}
	ngOnDestroy() {
	
		this.subscription.unsubscribe();
	}
}
