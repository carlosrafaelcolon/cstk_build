import { Component, OnInit, OnDestroy} from '@angular/core';
import { Router }              from '@angular/router';
import {StrikeService, StatisticService, basicStats,  Strike, LibraryService, Publication, HelperService} from '../../shared';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'app-pakistan',
  templateUrl: './pakistan.component.html'
})
export class PakistanComponent implements OnInit, OnDestroy {
    listLimit:number = 15;
    loadingPakComplete:boolean = false;
    publications: Publication[];
    basicPakStats:basicStats = {};
    pakStrikes: Strike[] = [];
    pakOptions:Object;
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
        this.getPakistan();
        this.pakOptions = this.strikeService.usInPak;
    }
    calculatePakStats = (strikes) => {
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
        this.basicPakStats = strikes
            .filter((instance) => instance.numStrikes > 0)
            .map((instance) => instance.casualties)
            .reduce((partialVals, instance) => {
                this.stat.buildStatsArray(partialVals, instance, ["civilians", "susMils", "unknowns", "totals"]);
                return partialVals;
            }, initialObj);
        
        //set numStrikes on vm to value calculated
        this.basicPakStats.numStrikes = numStrikes;
        
        //get sum and averages for casualty statistics
        this.stat.calculateAverage(this.basicPakStats.numStrikes, this.basicPakStats.totals);
        this.stat.calculateAverage(this.basicPakStats.numStrikes, this.basicPakStats.susMils);
        this.stat.calculateAverage(this.basicPakStats.numStrikes, this.basicPakStats.civilians);
        this.stat.calculateAverage(this.basicPakStats.numStrikes, this.basicPakStats.unknowns); 

    }; 
    // function to get list of strikes
    getPakistan(){

        let searchPak = this.strikeService.usInPak;
        if(!this.searchClicked){
            this.subPreSearch = this.strikeService
                    .getStrikeList(searchPak)
                        .subscribe(
                            pakistan => {
                                this.pakStrikes = pakistan.map(pakStrike => 
                                    Object.assign({}, pakStrike, {
                                         date: new Date(pakStrike.date).toLocaleDateString('en-US', this.help.shortOptions),
                                        year: new Date(pakStrike.date).getFullYear()
                                    })
                                );
                                this.calculatePakStats(this.pakStrikes);
                  
                            },
                            error => console.log('error getting strikes'),
                            () =>  this.loadingPakComplete = true 
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
        this.loadingPakComplete = false;
        this.searchClicked = true;

        this.listLimit = 15;
        let searchQuery = value || this.pakOptions;
        this.subSearch = this.strikeService
            .getStrikeList(searchQuery)
                .subscribe(
                    data => {
                        this.pakStrikes = data.map(strike => 
                            Object.assign({}, strike, {
                                date: new Date(strike.date).toLocaleDateString('en-US', this.help.shortOptions),
                                year: new Date(strike.date).getFullYear()
                            })
                        );
                        this.calculatePakStats(this.pakStrikes);
                    },
                    
                    error => console.log('error getting strikes'),
                    () => {
                        this.listLimit = 15;
                        this.loadingPakComplete = true;
                        
                    }
                );
        }
}
