import { Component, OnInit, OnDestroy} from '@angular/core';
import { Router }              from '@angular/router';
import {StrikeService, StatisticService, basicStats,  Strike, LibraryService, Publication, HelperService} from '../../shared';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-israel',
  templateUrl: './israel.component.html'
})
export class IsraelComponent implements OnInit, OnDestroy {
    listLimit:number = 15;
    loadingIsraelComplete:boolean = false;
    publications: Publication[];
    basicIsraelStats:basicStats = {};
    israelStrikes: Strike[] = [];
    israelOptions:Object;
    searchClicked:boolean = false;
    subPub:Subscription;
    subPreSearch:Subscription;
    subSearch:Subscription;
    value:number = 1;
    constructor(
    private router: Router,
    private strikeService: StrikeService,
    private libraryService:LibraryService,
    private help:HelperService,
    private stat:StatisticService
    ) { }

    ngOnInit() {
    this.getIsrael();

    this.israelOptions = this.strikeService.israel;
    }
    calculateIsraelStats = (strikes) => {
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
        this.basicIsraelStats = strikes
            .filter((instance) => instance.numStrikes > 0)
            .map((instance) => instance.casualties)
            .reduce((partialVals, instance) => {
                this.stat.buildStatsArray(partialVals, instance, ["civilians", "susMils", "unknowns", "totals"]);
                return partialVals;
            }, initialObj);
        
        //set numStrikes on vm to value calculated
        this.basicIsraelStats.numStrikes = numStrikes;
        
        //get sum and averages for casualty statistics
        this.stat.calculateAverage(this.basicIsraelStats.numStrikes, this.basicIsraelStats.totals);
        this.stat.calculateAverage(this.basicIsraelStats.numStrikes, this.basicIsraelStats.susMils);
        this.stat.calculateAverage(this.basicIsraelStats.numStrikes, this.basicIsraelStats.civilians);
        this.stat.calculateAverage(this.basicIsraelStats.numStrikes, this.basicIsraelStats.unknowns); 

    }; 
    // function to get list of strikes
    getIsrael(){

        let search = this.strikeService.israel;
        if(!this.searchClicked){
            this.subPreSearch = this.strikeService
                    .getStrikeList(search)
                        .subscribe(
                            israel => {
                                this.israelStrikes = israel.map(strike => 
                                    Object.assign({}, strike, {
                                        date: new Date(strike.date).toLocaleDateString('en-US', this.help.shortOptions),
                                        year: new Date(strike.date).getFullYear()
                                    })
                                );
                                this.calculateIsraelStats(this.israelStrikes);
                  
                            },
                            error => console.log('error getting strikes'),
                            () => this.loadingIsraelComplete = true
                            
                        );

            

        }
        this.subPub = this.libraryService.getPublications()
                .subscribe(publications => this.publications = publications) 
    
    }

    ngOnDestroy(){
        this.subPub.unsubscribe();
        this.subPreSearch.unsubscribe();
        if(this.searchClicked){
            this.subSearch.unsubscribe();
        }
    }
    trackStrike(index, strike) {

    return strike ? strike.strikeId : undefined;
    }
    goToStrike(strike) {
        this.listLimit = 15;
        this.value= 1;
        let link = ['/operations/incident/', strike.strikeId];
        this.router.navigate(link);
        
    };
    setActive(value, num) {
 
        if(value != num){
        
            this.value = num;
    
        }
    }
    activeText(num) {
      
        let styles = {
        
            'background-color':  this.value == num ? '#790E39' : '#ffffff',
            'color':  this.value == num ? '#ffffff' : '#790E39',
            'font-weight': 'bold',
           
            'transition-duration': '.35s',
            'transition-timing-function': 'linear'
        
        };
        return styles;
    }
    onSubmit(value) { 
        this.loadingIsraelComplete = false;
        this.searchClicked = true;


        this.listLimit = 15;
        let searchQuery = value || this.israelOptions;
        this.subSearch = this.strikeService
            .getStrikeList(searchQuery)
                .subscribe(
                    data => {
                        this.israelStrikes = data.map(strike => 
                            Object.assign({}, strike, {
                                date: new Date(strike.date).toLocaleDateString('en-US', this.help.shortOptions),
                                year: new Date(strike.date).getFullYear()
                            })
                        );
                        this.calculateIsraelStats(this.israelStrikes);
                    },
                    
                    error => console.log('error getting strikes'),
                    () => {
                        this.listLimit = 15;
                        this.loadingIsraelComplete = true;
                        
                    }
                );
        }

}
