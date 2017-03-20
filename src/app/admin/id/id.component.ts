import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router }              from '@angular/router';
import {NameService, Strike, StrikeService, HelperService } from '../../shared';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-id',
  templateUrl: './id.component.html'
})
export class IdComponent implements OnInit, OnDestroy {
  strike;
  searchQuery;
  loadedStrike;
  searchClicked:boolean = false;
  sub:Subscription;
  loadingComplete = false;
  constructor(
    private help:HelperService,
    private strikeService: StrikeService,
    private nameService:NameService) { }

  ngOnInit() {
  }
   search(searchOptions) {
     this.loadingComplete = false;

     this.searchClicked = true;
     this.searchQuery = searchOptions;
     this.sub = this.nameService.getID(this.searchQuery).subscribe(
                data =>  this.strike = data,
                error => console.log('error getting details'),
                () =>  this.loadingComplete = true);

   }
   // submit values to create data
    onSubmit(value: any){

 
        // console.log(value)
        let jsonObject = JSON.parse(value);
  
        this.strikeService.updateID(jsonObject, this.strike._id)
        .subscribe(
            data =>  alert('Data successfully updated!'),
            error => console.error("Error updating strike!"),
            () => this.loadingComplete = false
        );
    }
   ngOnDestroy(){
      if(this.searchClicked){
        this.sub.unsubscribe();
      }
      this.loadingComplete = false;
  }
}