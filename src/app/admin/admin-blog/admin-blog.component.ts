import { Component, OnInit, OnDestroy} from '@angular/core';
import { Router }              from '@angular/router';
import { CapitalizePipe, BlogService, Post, AuthService} from '../../shared';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-admin-blog',
  templateUrl: './admin-blog.component.html'
})
export class AdminBlogComponent implements OnInit,  OnDestroy  {
  posts:Post[];
  loadingPostsComplete:boolean = false;
  sub:Subscription;
  constructor(
    private router: Router,
    private blogService:BlogService,
    private auth:AuthService
  ) { }

   ngOnInit() {
    this.getBlog();

  }
  getBlog(){

  this.sub =  this.blogService.getBlogs()
                .subscribe(
                  posts => this.posts = posts,
                  error =>  console.log('error getting posts'),
                  () => this.loadingPostsComplete = true);

  }

    // Delete a specific person
  onRemove(post){
    
      if(this.auth.isAdmin()){
        let r = confirm('Are you sure you want to delete this post?');
        if (r == true) {
              this.loadingPostsComplete = false;
              this.blogService.removePost(post)
              .subscribe(
                () => this.getBlog(),
                error => console.log('error deleting post'),
                () => this.loadingPostsComplete = true
                  );
          } else {
              alert('Post Not Deleted!')
          }
      } else{
          alert('You are not authorized to delete posts');
      }

      

  }
  // Navigate to edit page
  onEdit(post): void {
    let link = ['/admin/blog/post/edit/', post.slug];
    this.router.navigate(link);
  }
  // Navigate to create page
  onSelectCreate() {
    let link = ['admin/blog/post/create'];
    this.router.navigate(link);
  }
  ngOnDestroy(){
      this.sub.unsubscribe();
  }

}
