import { Component, OnInit, OnDestroy} from '@angular/core';
import { Router }              from '@angular/router';
import {StrikeService, StatisticService, basicStats,  Strike, LibraryService, Publication, HelperService} from '../../shared';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'app-somalia',
  templateUrl: './somalia.component.html'
})
export class SomaliaComponent implements OnInit, OnDestroy {
    listLimit:number = 15;
    loadingSomaliaComplete:boolean = false;
    publications: Publication[];
    basicSomaliaStats:basicStats = {};
    somaliaStrikes: Strike[] = [];
    somaliaOptions:Object;
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
    this.getSomalia();
    this.somaliaOptions = this.strikeService.usInSomalia;
    }
    calculateSomaliaStats = (strikes) => {
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
        this.basicSomaliaStats = strikes
            .filter((instance) => instance.numStrikes > 0)
            .map((instance) => instance.casualties)
            .reduce((partialVals, instance) => {
                this.stat.buildStatsArray(partialVals, instance, ["civilians", "susMils", "unknowns", "totals"]);
                return partialVals;
            }, initialObj);
        
        //set numStrikes on vm to value calculated
        this.basicSomaliaStats.numStrikes = numStrikes;
        
        //get sum and averages for casualty statistics
        this.stat.calculateAverage(this.basicSomaliaStats.numStrikes, this.basicSomaliaStats.totals);
        this.stat.calculateAverage(this.basicSomaliaStats.numStrikes, this.basicSomaliaStats.susMils);
        this.stat.calculateAverage(this.basicSomaliaStats.numStrikes, this.basicSomaliaStats.civilians);
        this.stat.calculateAverage(this.basicSomaliaStats.numStrikes, this.basicSomaliaStats.unknowns); 

    }; 
    // function to get list of strikes
    getSomalia(){

        let search = this.strikeService.usInSomalia;
        if(!this.searchClicked){
            this.subPreSearch = this.strikeService
                    .getStrikeList(search)
                        .subscribe(
                            somalia => {
                                this.somaliaStrikes = somalia.map(strike => 
                                    Object.assign({}, strike, {
                                        date: new Date(strike.date).toLocaleDateString('en-US', this.help.shortOptions),
                                        year: new Date(strike.date).getFullYear()
                                    })
                                );
                                this.calculateSomaliaStats(this.somaliaStrikes);
               
                            },
                            error => console.log('error getting strikes'),
                            () =>  this.loadingSomaliaComplete = true
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
    onSubmit(value) { 
        this.loadingSomaliaComplete = false;
        this.searchClicked = true;

     
        this.listLimit = 15;
        let searchQuery = value || this.somaliaOptions;
        this.subSearch = this.strikeService
            .getStrikeList(searchQuery)
                .subscribe(
                    data => {
                        this.somaliaStrikes = data.map(strike => 
                            Object.assign({}, strike, {
                                date: new Date(strike.date),
                                year: new Date(strike.date).getFullYear()
                            })
                        );
                        this.calculateSomaliaStats(this.somaliaStrikes);
                    },
                    
                    error => console.log('error getting strikes'),
                    () => {
                        this.listLimit = 15;
                        this.loadingSomaliaComplete = true;
                        
                    }
                );
        }
}
