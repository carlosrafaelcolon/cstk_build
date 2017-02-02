import { Component, OnInit, OnDestroy} from '@angular/core';
import { Router, ActivatedRoute, Params}              from '@angular/router';
import {FormGroup, FormControl, FormArray, Validators, FormBuilder} from '@angular/forms';
import {BlogService, Post} from '../../../shared';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import {ComponentCanDeactivate} from '../../user-edit.guard';
import * as moment from 'moment';
@Component({
  selector: 'app-admin-post',
  templateUrl: './admin-post-edit.component.html'
})
export class AdminPostEditComponent implements OnInit, OnDestroy,  ComponentCanDeactivate {
  updateForm: FormGroup;
  loadingComplete:boolean = false;
   done:boolean = false;
  post:Post;
  sub:Subscription;
  bloggers;
  ids;
  categories;


  selectedCategory;
  selectedAuthor;
  selectedId
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private blogService:BlogService,
    private fb:FormBuilder
  ) { }

   ngOnInit(): void {

  
    //  this.bloggers = this.blogService.author;
    //  this.ids = this.blogService.authorId;

    //  this.selectedAuthor = this.bloggers[0].value;

    //  this.selectedId = this.ids[0].value;
		//preselect a value

        this.sub = this.route.params.subscribe(params => {
     
            this.blogService
                .getPost(params['slug'])
                .subscribe(
                    data => this.post = data,
                    error => console.log('error getting details'),
                    () => {
                      this.initForm();
                      this.loadingComplete = true;
                    }
                    );
        });

  }
  private initForm() {
    let postTags: FormArray = new FormArray([]);
    let postAuthors: FormArray = new FormArray([]);
    for (let i = 0; i < this.post.tags.length; i++) {
          postTags.push(
              new FormControl(this.post.tags[i], Validators.required)
      );
    }
    if (this.post.hasOwnProperty('authors')) {
            for (let i = 0; i < this.post.authors.length; i++) {
            
				postAuthors.push(
					new FormGroup({
						'name': new FormControl(this.post.authors[i].name, Validators.required),
						'authorId': new FormControl(this.post.authors[i].authorId)
					})
				);
            }
        }
 
    this.updateForm = this.fb.group({
        '_id':[this.post._id, Validators.required],
        'title': [this.post.title, Validators.required],
        'subtitle': [this.post.subtitle],
        'category': [this.post.category, Validators.required],
        'tags': postTags,
        'date': [ moment(this.post.date).format('YYYY-MM-DD'), Validators.required],
        'authors':postAuthors,
        'body':[this.post.body, Validators.required]
      });
  }
  
   gotoBlog(){
    let link = ['/admin/blog'];
    this.router.navigate(link);
  }
  onSubmit(value: any){

		this.blogService.updatePost(value)
			.subscribe(
				data =>  alert('Article successfully updated!!!'),
				error => console.error("Error adding article!"),
				()=>  {
                    this.done =true;
                    this.gotoBlog();
                }
			);


	}
  //Get, Push & Delete Topics
    get tags(): FormArray { return this.updateForm.get('tags') as FormArray; }
    addTag() { this.tags.push(new FormControl(null, Validators.required)); }
    removeTag(i: number) { this.tags.removeAt(i); }


    //Get, Push & Delete Authors
    get authors(): FormArray { return this.updateForm.get('authors') as FormArray; }
    addAuthor() { this.authors.push(
                      new FormGroup({
                          'name': new FormControl(null, Validators.required),
                          'authorId': new FormControl(null)
                    
                      }) ); }
    removeAuthor(i: number) { this.authors.removeAt(i); }

    ngOnDestroy(){
		this.sub.unsubscribe();
	}
  canDeactivate():  Observable<boolean> | boolean {
    if(!this.done){
        return confirm('Do you want to leave?');
    }
    return true
  }
}
