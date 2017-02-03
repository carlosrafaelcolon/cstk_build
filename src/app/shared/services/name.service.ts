import { Injectable } from '@angular/core';
import {Http, Response,  Headers, RequestOptions} from '@angular/http';
import {HelperService} from './helper.service';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class NameService {
    // Default
	nameOptions = {
		"peopleReported" : true
	}

    constructor(
      private http:Http,
      private help:HelperService
      ) { }
    private urlToSend = '/names';  // URL to GET web api
    private idToSend = '/id';  // URL to GET web api
    getNameList(searchTerms): Observable<any[]> {
        let details = JSON.stringify(searchTerms);  
        let headers      = new Headers({ 'Content-Type': 'application/json'}); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.urlToSend, details, options) // ...using post request
                            .map(this.help.extractData) // ...and calling .json() on the response to return data
                                .catch(this.help.handleError); //...errors if any
    }
    getName(strikeId) {
        let details = { strikeId: strikeId };

        return this.http.post(this.urlToSend, details)
                            .map(this.help.extractData) // ...and calling .json() on the response to return data
                                    .catch(this.help.handleError); //...errors if any
		}; 
        getIdList(searchTerms): Observable<any[]> {
        let details = JSON.stringify(searchTerms);  
        let headers      = new Headers({ 'Content-Type': 'application/json'}); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.idToSend, details, options) // ...using post request
                            .map(this.help.extractData) // ...and calling .json() on the response to return data
                                .catch(this.help.handleError); //...errors if any
    }

}