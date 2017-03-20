import { Component, OnInit, OnDestroy} from '@angular/core';
import { Router, ActivatedRoute, Params}              from '@angular/router';
import {StrikeService, StatisticService, basicStats, strikeStatistics, HelperService} from '../../shared';
import { Subscription } from 'rxjs/Subscription';
import { Location }               from '@angular/common';
@Component({
  selector: 'app-global-detail',
  templateUrl: './global-detail.component.html'
  
})
export class GlobalDetailComponent implements OnInit , OnDestroy {
	strike;
	sub:Subscription;
	sourceList = [];
  dateFormatted;
  pubDateFormatted;
  dateShortFormatted;
	currentStrike = {};
	constructor(
	private router: Router,
	private route: ActivatedRoute,
	private strikeService: StrikeService,
	private stat:StatisticService,
  private help:HelperService,
	private location: Location
	) { }
	strikeStatistics:strikeStatistics =  {
            totals: {
                min: 0,
                max: 0,
                avg: 0,
                sum: 0,
                values: []
            },
            susMils: {
                min: 0,
                max: 0,
                avg: 0,
                sum: 0,
                values: []
            },
            civilians: {
                min: 0,
                max: 0,
                avg: 0,
                sum: 0,
                values: []
            },
            unknowns: {
                min: 0,
                max: 0,
                avg: 0,
                sum: 0,
                values: []
            },
            counter: 0
	};
	ngOnInit(): void {
		
	this.sub = this.route.params.subscribe((params: Params) => {
		let strikeId = +params['strikeId'];
		this.strikeService.getStrike(strikeId).subscribe(
		data => {
			this.strike = data;
      this.dateFormatted =new Date(this.strike.date).toLocaleDateString('en-US', this.help.options);
      this.dateShortFormatted =new Date(this.strike.date).toLocaleDateString('en-US', this.help.shortOptions);
      this.strike.sources = this.strike.sources.map(source => 
          Object.assign({}, source, {
            pubDate:new Date(source.pubDate).toLocaleDateString('en-US', this.help.shortOptions)
          })
      );
		},
		error => console.log('error getting details')
		)

	});

}

	goBack(): void {
		this.location.back();
	}
	ngOnDestroy(){
		this.sub.unsubscribe();
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

}
