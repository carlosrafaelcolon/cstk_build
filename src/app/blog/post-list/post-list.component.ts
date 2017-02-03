import { Component, OnInit } from '@angular/core';
import { Router }              from '@angular/router';
import { CapitalizePipe,  BlogService, Post, HelperService} from '../../shared';
import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html'
})
export class PostListComponent implements OnInit {

  posts:Post[];
  loadingPostsComplete:boolean = false
  formatted = null;
  constructor(
    private router: Router,
    private help:HelperService,
    private blogService:BlogService) { }

  ngOnInit() {
    this.getBlog();
  }
  getBlog(){
    this.blogService.getBlogs()
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
        )

  }
  dateFormat(value){
    for (const prop in value) {
   
      value.date[prop];
      console.log( value.date[prop]);
    // `prop` contains the name of each property, i.e. `'code'` or `'items'`
    // consequently, `data[prop]` refers to the value of each property, i.e.
    // either `42` or the array
    }
    //new Date(value).toLocaleDateString('en-US', this.options);
  }
  gotoBlog(post){
      let link = ['/blog/post/', post.slug];
        this.router.navigate(link);
    }
}
