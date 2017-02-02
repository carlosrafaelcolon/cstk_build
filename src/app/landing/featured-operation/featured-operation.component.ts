import { Component, OnInit, OnDestroy} from '@angular/core';
import { Router, ActivatedRoute, Params}              from '@angular/router';
import {StrikeService, Strike} from '../../shared';
import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'app-featured-operation',
  templateUrl: './featured-operation.component.html'
})
export class FeaturedOperationComponent implements OnInit, OnDestroy {
  strike:Strike;
  subscription:Subscription;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private strikeService:StrikeService
  ) { }
  	ngOnInit(): void {
	   // Initializing Route Param Data
        this.subscription = this.route.params.subscribe(params => {
            let id = Number.parseInt(params['strikeId']);
           this.strikeService
                .getOperation(id)
                .subscribe(
                    strike => this.strike = strike,
                    error => console.log('error getting strike')
                );
        });

  	}

  goHome(){
    let link = ['/'];
    this.router.navigate(link);
  }
  gotoStrikes(){
    let link = ['/operations'];
    this.router.navigate(link);
  }
  	activeStatus(status:string) {
        if(status.toLowerCase() == 'suspected militant'){
          let styles = {
              
				'background-color':  '#367D36',
				'font-size':'55%',
				'vertical-align': 'super',
				'border-radius': '0'
          
          };
          return styles;
        }
        if(status.toLowerCase() == 'hvt'){
          let styles = {
              
				'background-color':  '#CE121B',
				'font-size':'55%',
				'vertical-align': 'super',
				'border-radius': '0'
      
          
          };
          return styles;
        }
        if(status.toLowerCase() == 'civilian'){
          let styles = {
              
			'background-color':  '#fabb05',
			'font-size':'55%',
			'vertical-align': 'super',
			'border-radius': '0'
           
          
          };
          return styles;
        }
        if(status.toLowerCase() == 'unknown'){
          let styles = {
              
				'background-color':  '#000000',
				'font-size':'55%',
				'vertical-align': 'super',
				'border-radius': '0'
           
          
          };
          return styles;
        }
      
  	}
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
