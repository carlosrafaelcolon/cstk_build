import { Component, OnInit, OnDestroy} from '@angular/core';
import { Router, ActivatedRoute, Params}              from '@angular/router';
import {StrikeService, Strike, HelperService} from '../../shared';
import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'app-featured-operation',
  templateUrl: './featured-operation.component.html'
})
export class FeaturedOperationComponent implements OnInit, OnDestroy {
  strike;
  subscription:Subscription;
  dateFormatted;
  dateShortFormatted;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private help:HelperService,
    private strikeService:StrikeService
  ) { }
  	ngOnInit(): void {
	   // Initializing Route Param Data
        this.subscription = this.route.params.subscribe(params => {
            let id = Number.parseInt(params['strikeId']);
           this.strikeService
                .getOperation(id)
                .subscribe(
                    strike => {
                      this.strike = strike;
                      this.dateFormatted =new Date(this.strike.date).toLocaleDateString('en-US', this.help.options);
                      this.dateShortFormatted =new Date(this.strike.date).toLocaleDateString('en-US', this.help.shortOptions);
                      this.strike.sources = this.strike.sources.map(source => 
                          Object.assign({}, source, {
                            pubDate:new Date(source.pubDate).toLocaleDateString('en-US', this.help.shortOptions)
                          })
                      );
                    },
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
              
				'color':  '#367D36',
				'font-weight':'bold'
          
          };
          return styles;
        }
        if(status.toLowerCase() == 'hvt'){
          let styles = {
              
				'color':  '#CE121B',
				'font-weight':'bold'
      
          
          };
          return styles;
        }
        if(status.toLowerCase() == 'civilian'){
          let styles = {
              
			'color':  '#fabb05',
			'font-weight':'bold'
           
          
          };
          return styles;
        }
        if(status.toLowerCase() == 'unknown'){
          let styles = {
              
				'color':  '#000000',
				'font-weight':'bold'
           
          
          };
          return styles;
        }
      
  	}
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
