import { Component, OnInit, OnDestroy} from '@angular/core';
import { Router }              from '@angular/router';
import {StrikeService, StatisticService, basicStats, HelperService} from '../../shared';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit, OnDestroy {
  listLimit:number = 15;
  strike: any;
  strikes: any[] = [];
  basicStats:basicStats = {};
  loadingComplete = undefined;
  selectedYear = "";
  options:Object;
  searchClicked:boolean = false;
  sub:Subscription;
  constructor(
        private router: Router,
        private strikeService: StrikeService,
        private help:HelperService,
        private stat:StatisticService
  ){ }
  
  ngOnInit() {
    this.options = this.strikeService.options;
  }
  
  calculateStats = (strikes) => {
    let numStrikes = 0;
    //create object to hold statistics
    const initialObj = {
        totals: {
            avg: 0,
            sum: 0,
            values: []
        },
        susMils: {
            avg: 0,
            sum: 0,
            values: []
        },
        civilians: {
            avg: 0,
            sum: 0,
            values: []
        },
        unknowns: {
            avg: 0,
            sum: 0,
            values: []
        },
        counter: 0
    };
    //get number of strikes 
    strikes.forEach((instance) => {
        if (!isNaN(Number(instance.numStrikes))) {
            numStrikes += instance.numStrikes;
        }
    })
    //filter strikes to get casualty values
    this.basicStats = strikes
        .filter((instance) => instance.numStrikes > 0)
        .map((instance) => instance.casualties)
        .reduce((partialVals, instance) => {
            this.stat.buildStatsArray(partialVals, instance, ["civilians", "susMils", "unknowns", "totals"]);
            return partialVals;
        }, initialObj);
    
    //set numStrikes on vm to value calculated
    this.basicStats.numStrikes = numStrikes;
    
    //get sum and averages for casualty statistics
    this.stat.calculateAverage(this.basicStats.numStrikes, this.basicStats.totals);
    this.stat.calculateAverage(this.basicStats.numStrikes, this.basicStats.susMils);
    this.stat.calculateAverage(this.basicStats.numStrikes, this.basicStats.civilians);
    this.stat.calculateAverage(this.basicStats.numStrikes, this.basicStats.unknowns); 
  }; 
  search(searchOptions) {
    this.loadingComplete = false;
    this.searchClicked = true;
    if(this.searchClicked){
        this.isAttackerVisible = false;
        this.isAttackedVisible = false;
        this.isWeaponVisible = false;
        this.isActionVisible = false;
    }
    

    let searchQuery = searchOptions || {};
    this.sub = this.strikeService
        .getStrikeList(searchQuery)
            .subscribe(
                data => {
                    this.strikes = data.map(strike => 
                        Object.assign({}, strike, {
                            date: new Date(strike.date).toLocaleDateString('en-US', this.help.shortOptions),
                            year: new Date(strike.date).getFullYear()
                        })
                    );
                    this.calculateStats(this.strikes);
            
                },
                
                error => console.log('error getting strikes'),
                () => {
                    this.listLimit = 15;
                    this.loadingComplete = true;
                    
                }
                );
                        
  };
  ngOnDestroy(){
      this.resetAll(this.options);
      if(this.searchClicked){
        this.sub.unsubscribe();
      }
  }
  trackStrike(index, strike) {

    return strike ? strike.strikeId : undefined;
  }
  goToStrike(strike) {
      let link = ['/operations/incident/', strike.strikeId];
      this.router.navigate(link);
    //   this.resetAll(this.options);
  };
  affectAll(arr, bool) {
    arr = arr.map(item => item.selected = bool);
  };
  resetAll(options) {
    options.excludeWeapons = false;
    for (const prop in options) {
      for (const item of  options[prop]) {
        if (item.hasOwnProperty('selected')) {
          item.selected = false
        }
        // `item` is the array element, **not** the index
      }
    }
  };



  isAttackerVisible:boolean = true;
  isAttackedVisible:boolean = true;
  isWeaponVisible:boolean = true;
  isActionVisible:boolean = true;
  toggle(item:number){

    if (item == 1) {
       this.isAttackerVisible = !this.isAttackerVisible;

  
    } 
    if (item == 2) {
       this.isAttackedVisible = !this.isAttackedVisible;
    }
    if (item == 3) {
       this.isWeaponVisible = !this.isWeaponVisible;
    }
    if (item == 4) {
       this.isActionVisible = !this.isActionVisible;
    }
     
  }
    setContent(bool) {
        let styles = {
        
            'min-height':  bool ? '150px' : '0px',
            'transition-property': 'min-height',
            'transition-duration': '.35s',
            'transition-timing-function': 'linear'
        
        };
        return styles;
    }
  setHeader(bool) {
    let styles = {
      
        'background-color':  bool ? '#24272D' : '#CE121B',
         'transition-property': 'background-color',
        'transition-duration': '.35s',
        'transition-timing-function': 'linear'
     
    };
    return styles;
  }
  setBox(bool) {
    let styles = {
      
        'border-color':  bool ? '#24272D' : '#CE121B',
         'transition-property': 'border-color',
        'transition-duration': '.35s',
        'transition-timing-function': 'linear'
     
    };
    return styles;
  }
  setDisplay(bool) {
    let styles = {
      
        'display':  bool ? 'block' : 'none',
         'transition-property': 'display',
        'transition-duration': '.35s',
        'transition-timing-function': 'linear'
     
    };
    return styles;
  }


}
