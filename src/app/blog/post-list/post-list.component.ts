import { Component, OnInit } from '@angular/core';
import { Router }              from '@angular/router';
import { CapitalizePipe,  BlogService, Post} from '../../shared';
import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html'
})
export class PostListComponent implements OnInit {

  posts:Post[];
  loadingPostsComplete:boolean = false
  options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone:'UTC' };
  formatted = null;
  constructor(
    private router: Router,
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
                                  date: new Date(post.date).toLocaleDateString('en-US', this.options)
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
