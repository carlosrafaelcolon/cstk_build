import { Component, OnInit, OnDestroy, ElementRef  } from '@angular/core';
import { Router }              from '@angular/router';
import {FormGroup, FormControl, FormArray, Validators, FormBuilder} from '@angular/forms';
import {BlogService, } from '../../../shared';
import {ComponentCanDeactivate} from '../../user-edit.guard';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import * as moment from 'moment';
@Component({
  selector: 'app-admin-post-create',
  templateUrl: './admin-post-create.component.html'
})
export class AdminPostCreateComponent implements OnInit, ComponentCanDeactivate {
  postForm: FormGroup;
  categories;
  bloggers;
  ids;
  textBlock = "<div class=\"text-block\"></div>";
  selectedCategory;
  selectedAuthor;
  selectedId;
  authorId = null;
  done:boolean = false;
  today = new Date().toJSON();
  formattedDate = moment(this.today).format('YYYY-MM-DD');
  constructor(

        private router: Router,
        private blogService: BlogService,
        private fb:FormBuilder){
	
		}

	ngOnInit() {
		this.categories = this.blogService.category;
		// this.bloggers = this.blogService.author;
		// this.ids = this.blogService.authorId;
		//preselect a value
    	this.selectedCategory = this.categories[0].value;
		// this.selectedAuthor = this.bloggers[0].value;
		// this.selectedId = this.ids[0].value;
	

		this.initForm();

    	
	}
	idSelected(value){
		
		console.log(value)
		// console.log(value.map(value => value.find(id =>  value.authorId === this.selectedAuthor)))
		// document.getElementById('name').value;
		// console.log(document.getElementById('name').value);
		// document.getElementById(name).value
	}
  	private initForm() {
        this.postForm = this.fb.group({
			'title': [null, Validators.required],
			'subtitle': [null],
			'category': [this.selectedCategory, Validators.required],
			'tags': this.fb.array([
				// ['', Validators.required]
			]),
			'date': [this.formattedDate, Validators.required],
			'authors':this.fb.array([
				this.fb.group({
					'name': [null, Validators.required],
					'authorId': [null]
				})
			]),
			'body':[this.textBlock, Validators.required]
			});
	}
	gotoBlog(){
    let link = ['/admin/blog'];
    this.router.navigate(link);
  }

	onSubmit(value: any){
	
	
		this.blogService.addPost(value)
			.subscribe(
				data =>  alert('Article successfully added!!!'),
				error => console.error("Error adding article!"),
				()=>  {
                    this.done =true;
                    this.gotoBlog();
                }
			);


	}
	canDeactivate():  Observable<boolean> | boolean {
    if(!this.done){
        return confirm('Do you want to leave?');
    }
    return true
  }
	//Get, Push & Delete Topics
    get tags(): FormArray { return this.postForm.get('tags') as FormArray; }
    addTag() { this.tags.push(new FormControl(null, Validators.required)); }
    removeTag(i: number) { this.tags.removeAt(i); }


    //Get, Push & Delete Authors
    get authors(): FormArray { return this.postForm.get('authors') as FormArray; }
	addAuthor() { this.authors.push(
                      new FormGroup({
                          'name': new FormControl(null, Validators.required),
                          'authorId': new FormControl(null)
                    
                      }) ); }
    removeAuthor(i: number) { this.authors.removeAt(i); }
}
