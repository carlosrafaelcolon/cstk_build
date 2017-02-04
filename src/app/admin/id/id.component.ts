import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router }              from '@angular/router';
import {NameService, Strike, HelperService } from '../../shared';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-id',
  templateUrl: './id.component.html'
})
export class IdComponent implements OnInit, OnDestroy {
  strikes;
  searchClicked:boolean = false;
  sub:Subscription;
  loadingComplete = false;
  constructor(
    private help:HelperService,
    private nameService:NameService) { }

  ngOnInit() {
  }
   search(searchOptions) {
     this.loadingComplete = false;
     console.log(searchOptions)
     this.searchClicked = true;
     let searchQuery = searchOptions;
     this.sub =  this.nameService
      .getIdList(searchQuery)
        .subscribe(
          data =>  this.strikes = data,
          error => console.log('error getting strike'),
          () => {
                  this.loadingComplete = true;
                }
          
        );

   }
   ngOnDestroy(){
      if(this.searchClicked){
        this.sub.unsubscribe();
      }
  }
}
