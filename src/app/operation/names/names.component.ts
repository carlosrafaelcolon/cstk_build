import { Component, OnInit  } from '@angular/core';
import { Router }              from '@angular/router';
import {NameService, Strike } from '../../shared';
import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'app-names',
  templateUrl: './names.component.html'
})
export class NamesComponent implements OnInit {
  strikes: Strike[] = [];
  options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone:'UTC' };
  loadingComplete = false;
  value:number = 1;
  sub:Subscription;
  constructor(
    private router:Router,
    private nameService:NameService
  ) { 

  }

  ngOnInit() {
    this.getNames();
    
  }
  getNames(){
     let searchQuery = this.nameService.nameOptions;
     this.sub =  this.nameService
      .getNameList(searchQuery)
        .subscribe(
          data => {
              this.strikes = data.map(strike => 
                  Object.assign({}, strike, {
                      date: new Date(strike.date).toLocaleDateString('en-US', this.options),
                      year: new Date(strike.date).getFullYear()
                  })
              );

              

          },
          error => console.log('error getting names'),
          () => {
                  this.loadingComplete = true;
                }
          
        );

  }
  setActive(value, num) {
          console.log(value);
          if(value != num){
          
              this.value = num;
              console.log(value);
          }
          let styles = {
          
              'color':  value == num ? '#790E39 !important' : '#002147',

              'transition-duration': '.35s',
              'transition-timing-function': 'linear'
          
          };
          return styles;
  }
  activeText(num) {
    
      let styles = {
      
          'color':  this.value == num ? '#790E39' : '#002147',
          'transition-duration': '.35s',
          'transition-timing-function': 'linear'
      
      };
      return styles;
  }
  activeStatus(status:string) {
        if(status.toLowerCase() == 'suspected militant'){
          let styles = {
              
              'color':  '#367D36',
       
          
          };
          return styles;
        }
        if(status.toLowerCase() == 'hvt'){
          let styles = {
              
              'color':  '#CE121B',
      
          
          };
          return styles;
        }
        if(status.toLowerCase() == 'civilian'){
          let styles = {
              
              'color':  '#fabb05',
           
          
          };
          return styles;
        }
        if(status.toLowerCase() == 'unknown'){
          let styles = {
              
              'color':  '#000000',
           
          
          };
          return styles;
        }
      
  }
    goToStrike(strike) {

        let link = ['/operations/incident/', strike.strikeId];
        this.router.navigate(link);
        
    };
    ngOnDestroy() {
		this.sub.unsubscribe();
	}
}
