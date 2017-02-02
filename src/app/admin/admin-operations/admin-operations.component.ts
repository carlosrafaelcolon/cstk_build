import { Component, OnInit  } from '@angular/core';
import { Router }              from '@angular/router';
import {StrikeService, Strike, AuthService } from '../../shared';


@Component({
  selector: 'app-admin-operations',
  templateUrl: './admin-operations.component.html'
})
export class AdminOperationsComponent implements OnInit {
  listLimit:number = 15;

  strikes: any[] = [];
  loadingComplete = false;
  options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone:'UTC' };
  strikeOptions:Object;
  public weapons;
  public attackers;
  public targets;
  searchClicked:boolean = false;
  weapon;
  attacker;
  target;
  constructor(
    private router:Router,
    private strikeService:StrikeService,
	private auth:AuthService
  ) { }

  ngOnInit() {
    // Immedialtey initiates list of strikes
        this.getStrikes();
        this.strikeOptions = this.strikeService.options;
        //retrieve library options
        this.weapons = this.strikeService.weapons;
        this.attackers = this.strikeService.attackers;
        this.targets = this.strikeService.targets;

    //preselect a value
    // this.weapon = this.weapons[0].value;
    // this.attacker = this.attacker[0].value;
    // this.target = this.target[0].value;
  }

  getStrikes(){
            let searchQuery = {};
            if(!this.searchClicked){
              this.strikeService
              .getStrikeList(searchQuery)
                  .subscribe(
                      data => {
                          this.strikes = data.map(strike => 
                              Object.assign({}, strike, {
                                  date: new Date(strike.date).toLocaleDateString('en-US', this.options),
                                  year: new Date(strike.date).getFullYear()
                              })
                          );
                      },
                      error => console.log('error getting strikes'),
                      () => {
                        this.listLimit = 15;
                        this.loadingComplete = true;
                      }
                      );
            }
           

          
  }
  // Delete a specific strike
  // Delete a specific person
    onRemove(strike){
    
		if(this.auth.isAdmin()){
		let r = confirm('Are you sure you want to delete this strike?');
		if (r == true) {
				this.loadingComplete = false;
				this.strikeService.removeStrike(strike)
				.subscribe(
					() => this.getStrikes(),
					error => console.log('error deleting strike'),
					() => this.loadingComplete = true
					);
			} else {
				alert('Strike Not Deleted!')
			}
		} else{
			alert('You are not authorized to delete strikes');
		}



	}
 
  // Navigate to create page
  onSelectCreate() {
    let link = ['admin/operations/create'];
    this.router.navigate(link);
  }
  // Navigate to edit page
  onEdit(strike): void {
    if(this.auth.isAdmin()){
      let link = ['/admin/operations/edit/', strike.strikeId];
      this.router.navigate(link);
    } else{
      alert('Editing platform is currently unavailable');
    }
  }
  trackStrike(index, strike) {
      return strike ? strike.strikeId : undefined;
    }

  reset(term){
    for (const prop in term) {
   
      term[prop] = null;
    // `prop` contains the name of each property, i.e. `'code'` or `'items'`
    // consequently, `data[prop]` refers to the value of each property, i.e.
    // either `42` or the array
    }
  }

 affectAll(arr, bool) {
    arr = arr.map(item => item.selected = bool);
  };
  resetAll(options) {
    for (const prop in options) {
      options.excludeWeapons = false;
      for (const item of  options[prop]) {
        if (item.hasOwnProperty('selected')) {
          item.selected = false
        }
        // `item` is the array element, **not** the index
      }
    }
  };


onSubmit(value) { 
  this.loadingComplete = false;
    this.searchClicked = true;


  this.listLimit = 15;
      let searchQuery = value || {};
    this.strikeService
        .getStrikeList(searchQuery)
            .subscribe(
                data => {
                    this.strikes = data.map(strike => 
                        Object.assign({}, strike, {
                            date: new Date(strike.date),
                            year: new Date(strike.date).getFullYear()
                        })
                    );
                },
                
                error => console.log('error getting strikes'),
                () => {
                    this.listLimit = 15;
                    this.loadingComplete = true;
                    
                }
                );
}

}
