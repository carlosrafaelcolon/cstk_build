export interface Publication {

    _id: number;
    pubId: number;
    id: number;
    title: string;
    themes: string[];
    topics: string[];
    pubDate: string;
    authors: string[];
    pubType: string;
    publisher: string;
    pageCount : number;
    summary: string;
    link: string;
    reviewed: boolean;
    reviews:  [
          {
            reviewer: string;
            reviewTitle: string;
            reviewLink: string;
          }
      ]
}



import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {HelperService} from './helper.service';
import {AuthHttp} from 'angular2-jwt';
@Injectable()
export class LibraryService {
  public themes = [
      { value: null, display: 'Any Theme' },
      { value: 'primary sources', display: 'Primary Sources' },
      { value: 'law', display: 'Law' },
      { value: 'history', display: 'History' },
      { value: 'politics', display: 'Politics' },
      { value: 'technology', display: 'Technology' },
      { value: 'cybersecurity', display: 'Cybersecurity' },
      { value: 'strategy', display: 'Strategy' },
      { value: 'ethics', display: 'Ethics' },
      { value: 'legitimacy', display: 'Legitimacy' }
  ];
  public themeSelection = [
      { value: null, display: 'Select a Theme' },
      { value: 'primary sources', display: 'Primary Sources' },
      { value: 'law', display: 'Law' },
      { value: 'history', display: 'History' },
      { value: 'politics', display: 'Politics' },
      { value: 'technology', display: 'Technology' },
      { value: 'cybersecurity', display: 'Cybersecurity' },
      { value: 'strategy', display: 'Strategy' },
      { value: 'ethics', display: 'Ethics' },
      { value: 'legitimacy', display: 'Legitimacy' }
  ];
  public topics = [
    { value: null, display: 'Any Topic' },
    { value: 'drones', display: 'Drones' },
    { value: 'targeted killing', display: 'Targeted Killing' },
    { value: 'autonomy', display: 'Autonomy' },
    { value: 'proliferation', display: 'Proliferation' },
    { value: 'cia', display: 'CIA' },
    { value: 'data', display: 'Data' }
  ];
  public countries = [
    { value: null, display: 'Any Country' },
    { value: 'israel', display: 'Israel' },
    { value: 'yemen', display: 'Yemen' },
    { value: 'pakistan', display: 'Pakistan' },
    { value: 'somalia', display: 'Somalia' },
    { value: 'turkey', display: 'Turkey' }
  ];
  public pubTypeSelection = [
      { value: null, display: 'Select a Publication Type' },
      { value: 'book', display: 'Book' },
      { value: 'book chapter', display: 'Book Chapter' },
      { value: 'anthology', display: 'Anthology' },
      { value: 'document', display: 'Document' },
      { value: 'article', display: 'Article' },
      { value: 'report', display: 'Report' },
      { value: 'working paper', display: 'Working Paper' },
      { value: 'news report', display: 'News Report' }
  ];
  private librarysUrl = '/api/publications';  // URL to GET web api
  private libraryCreate = '/api/publications/create'; // URL to POST data
  private libraryDelete = '/api/publications/delete/'; // URL to DELETE data
  private libraryEdit = '/api/publications/edit/'; // URL to PUT data
  constructor(
    private http:Http,
    private help:HelperService,
    private authHttp: AuthHttp
    ) { }

  // Retrieve All library Data
  getPublications(): Observable<Publication[]> {
    return this.http.get(this.librarysUrl)
                            .map(this.help.extractData)
                              .catch(this.help.handleError);        
  }
  // Retrieve Specific publication based on ID Route Param
  getPublication(id: number): Observable<Publication> {
    return this.getPublications()
                .map(publications => publications.find(publication =>  publication.pubId === id))
                  .catch(this.help.handleError);        
  }
   //Delete a publication 

    removePublication(publication: Publication): Observable<Publication[]> {
        return this.authHttp.delete(this.libraryDelete + publication._id) // ...using put request
                         .map(this.help.extractData)
                          .catch(this.help.handleError);
    }   
 

   // Update a person
    updatePublication (publication: Publication): Observable<Publication[]> {
        const json = JSON.stringify(publication); // Stringify payload
        let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options       = new RequestOptions({ headers: headers }); // Create a request option

        return this.authHttp.put(this.libraryEdit + publication._id, json, options) // ...using put request
                                  .map(this.help.extractData)
                                        .catch(this.help.handleError);    
    }  
 //Add a new person
    addPublication (publication: Publication): Observable<Publication[]> {
        const json = JSON.stringify(publication);
        let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options       = new RequestOptions({ headers: headers }); // Create a request option

        return this.authHttp.post(this.libraryCreate, json, options) // ...using post request
                         .map(this.help.extractData)
                              .catch(this.help.handleError);    
    }  

//*************************************
// Helpers
//*************************************


  
}
