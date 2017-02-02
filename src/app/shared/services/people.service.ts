
export interface People {

  _id: number;
  staffId:number;
  slug:string;
  name: string;
  title: string;
  img: string;
  email: string;
  twitter: string;
  github: string;
  website:string;
  shortBio: string;
  bio: string;
  publication:  [
        {
        pubName: string;
        link: string;
        }
    ]
}

import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {HelperService} from './helper.service';
import {AuthHttp} from 'angular2-jwt';

@Injectable()
export class PeopleService {
 
    private peoplesUrl = '/api/people';  // URL to GET web api
    private peopleCreate = '/api/people/create'; // URL to POST data
    private peopleDelete = '/api/people/delete/'; // URL to DELETE data
    private peopleEdit = '/api/people/edit/'; // URL to PUT data
    constructor(
    private http:Http,
    private authHttp: AuthHttp,
    private help:HelperService
    // private authHttp: AuthHttp
    ) { }

      // Retrieve All People Data
  getPeople(): Observable<People[]> {
    return this.http.get(this.peoplesUrl)
                      .map(this.help.extractABC)
                          .catch(this.help.handleError);      
  }
  // Retrieve Specific person based on ID Route Param
  getPerson(id: number): Observable<People> {
    return this.getPeople()
               .map(people => people.find(person =>  person.staffId === id))
                 .catch(this.help.handleError); //...errors if any
  }
  // Retrieve Specific person based on ID Route Param
  getSlug(slug: string): Observable<People> {
    return this.getPeople()
               .map(people => people.find(person =>  person.slug === slug))
                 .catch(this.help.handleError); //...errors if any
  }
  //Delete a person 
    removePerson (person): Observable<People[]> {
        return this.authHttp.delete(this.peopleDelete + person._id) // ...using put request
                         .map(this.help.extractData)
                          .catch(this.help.handleError);
    }   

    //Update a person
    updatePerson (person: People): Observable<People[]> {
        let bodyString = JSON.stringify(person); // Stringify payload
        let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options       = new RequestOptions({ headers: headers }); // Create a request option

        return this.authHttp.put(this.peopleEdit + person._id, person, options) // ...using put request
                         .map(this.help.extractData)
                          .catch(this.help.handleError);
    }  
// Add a new person
    addPerson (person: People): Observable<People[]> {
        const json = JSON.stringify(person);
        let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options       = new RequestOptions({ headers: headers }); // Create a request option

        return this.authHttp.post(this.peopleCreate, json, options) // ...using post request
                         .map(this.help.extractData)
                          .catch(this.help.handleError);
    }





  

}
