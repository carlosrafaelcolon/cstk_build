export interface Post {
  _id: number;
	slug: string;
  title:string;
  subtitle:string;
  category:string;
  tags:string[];
	date: string;
  updated:string;
	authors:[
    {
      name:string;
      authorId:number;
    }
  ];
  body:string;


}

import { Injectable } from '@angular/core';
import {HelperService} from './helper.service';
import {Http, Response,  Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {AuthHttp} from 'angular2-jwt';
@Injectable()
export class BlogService {
	//URLs
	private blogUrl = '/api/posts';  // URL to GET web api
	 private postCreate = '/api/posts/create'; // URL to POST data
    private postDelete = '/api/posts/delete/'; // URL to DELETE data
    private postEdit = '/api/posts/edit/'; // URL to PUT data

  constructor(
	  private http:Http,
    private authHttp: AuthHttp,
	  private help:HelperService
	  ) { }

  //Methods
  getBlogs():Observable<Post[]> {
    return this.http.get(this.blogUrl)
                .map(this.help.extractData)
                  .catch(this.help.handleError);
  }
  getPost(slug: string): Observable<any> {
    return this.getBlogs()
                .map(posts => posts.find(post => post.slug === slug))
                  .catch(this.help.handleError);
  }
  removePost (post): Observable<any[]> {
        return this.authHttp.delete(this.postDelete + post._id) // ...using put request
                        .map(this.help.extractData) // ...and calling .json() on the response to return data
                                    .catch(this.help.handleError); //...errors if any
    }   

    // Update a strike
    updatePost (post): Observable<any[]> {
        let json = JSON.stringify(post); // Stringify payload
        let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options       = new RequestOptions({ headers: headers }); // Create a request option

        return this.authHttp.put(this.postEdit + post._id, json, options) // ...using put request
                       .map(this.help.extractData) // ...and calling .json() on the response to return data
                                    .catch(this.help.handleError); //...errors if any
    }  
// Add a new strike
    addPost (post): Observable<any[]> {
        const json = JSON.stringify(post);
        let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options       = new RequestOptions({ headers: headers }); // Create a request option

        return this.authHttp.post(this.postCreate, json, options) // ...using post request
                         .map(this.help.extractData) // ...and calling .json() on the response to return data
                         .catch(this.help.handleError); //...errors if any
    }  

     public category = [
        { value: '', display: 'Select A Category' },
        { value: 'in the news', display: 'In The News' },
        { value: 'update', display: 'Update' },
        { value: 'publication', display: 'Publication' },
        { value: 'review', display: 'Review' },
        { value: 'incident', display: 'Incident' },
        { value: 'opinion', display: 'Opinion' },
        { value: 'video', display: 'Video' }
    ];
    public author = [
        { value: null, display: 'Select An Author' },
        {  value: 'avery plaw', display: 'Avery Plaw' },
        {  value: 'carlos r. colon', display: 'Carlos R. Colon' },
        {  value: 'matthew s. fricker', display: 'Matthew S. Fricker' },
        {  value: 'brian glyn williams', display: 'Brian Glyn Williams' },
        {  value: 'peter sandby-thomas', display: 'Peter Sandby-Thomas' },
        {  value: 'robert souza', display: 'Robert Souza' },
        {  value: null, display: 'CSTK Staff' }
    ];
    public authorId = [
        {  value: null, display: 'None' },
        {  value: 1, display: 'Brian Glyn Williams' },
        {  value: 2, display: 'Avery Plaw' },
        { value: 3, display: 'Matthew S. Fricker' },
        { value: 4, display: 'Carlos R. Colon' },
        { value: 5, display: 'Peter Sandby-Thomas' },
        { value: 6, display: 'Robert Souza' }
    ];
}
