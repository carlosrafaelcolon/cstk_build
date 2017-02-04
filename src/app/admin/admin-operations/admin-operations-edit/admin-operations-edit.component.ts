import { Component, OnInit, OnDestroy  } from '@angular/core';
import { Router, ActivatedRoute, Params }              from '@angular/router';
import {FormGroup, FormControl, FormArray, Validators, FormBuilder} from '@angular/forms';
import {StrikeService, Strike, HelperService } from '../../../shared';
import {ComponentCanDeactivate} from '../../user-edit.guard';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import * as moment from 'moment';
@Component({
  selector: 'app-admin-operations-edit',
  templateUrl: './admin-operations-edit.component.html'
})
export class AdminOperationsEditComponent implements OnInit, OnDestroy, ComponentCanDeactivate {
    // request a weekday along with a long date
    keys = function(obj){
      let results = [];
      for(let array of obj){
          for(let tag of array.tags){
              results.push(tag)
          }
        ;
      }
      return results;
    } ;
    today = new Date().toJSON();
    formattedDate = moment.utc(this.today).format('YYYY-MM-DD');
	
    updateForm: FormGroup;
    strike;
    private subscription: Subscription;
    done = false;


    statusSelections;
    stateStatusSelections;

    selectedStatus;

    selectedStateStatus;
  //sourcePubDates;
    constructor(
            private route: ActivatedRoute,
            private router: Router,
            private help:HelperService,
            private strikeService: StrikeService,
            private fb:FormBuilder){}

    ngOnInit(): void {

            //status
            this.statusSelections = this.strikeService.statusSelection;
            this.selectedStatus = this.statusSelections[0].value;

            //state status
            this.stateStatusSelections = this.strikeService.stateStatus;
    

            this.subscription = this.route.params.subscribe((params: Params) => {

            let strikeId = +params['strikeId'];
            console.log(strikeId);
            this.strikeService.getStrike(strikeId).subscribe(
                data =>  {
                    this.strike = data
                    console.log(this.keys(this.strike.sources));
                },
                error => console.log('error getting details'),
                () => this.initForm()
            );
            
            });

    }
    private initForm() {
            "use strict";

            let strike_id = null;
            let strikeDate = null;
            let strikeTime = null;
            let stikeCount = null;
            let extended = null;
            let onBorder = null;
            let strikeReviewed = false;
            let groupReported = false;
            let peopleReported = false;
            let strikeTargets: FormArray = new FormArray([]);
            let strikeAttackers: FormArray = new FormArray([]);
            let weaponTypes: FormArray = new FormArray([]);
            let actionTypes: FormArray = new FormArray([]);
            let Objects: FormArray = new FormArray([]);
            let Groups: FormArray = new FormArray([]);
            let Peoples: FormArray = new FormArray([]);
            let strikeTotal = null;
            let strikeSusMils = null;
            let strikeCiv = null;
            let strikeUnk = null;
            let strikeHvts = null;
            let strikeChil = null;
            let strikeSummary: FormArray = new FormArray([]);
            let strikeTags:FormArray = new FormArray([]);
            let strikeSources: FormArray = new FormArray([]);
            // mainReport Fields
            let strikeMainReport:FormGroup = new FormGroup({});
            let sourceTypeTags: FormArray = new FormArray([]);

            let targetTypeDetails = null;
            let additionalTargetDetails = null;
            let location = null;
            let targetType = null;
            let time = null;
            let strikeStateStatus = null;
            let weaponTypeTags: FormArray = new FormArray([]);
            let ambigWeapon = false;

            let additionalKilledDetails = null;
            let killedStatus = null;

            let sourceTotal = null;
            let sourceSusMils = null;
            let sourceCiv = null;
            let sourceUnk = null;
            let sourceHvts = null;
            let sourceChil = null;
            // mainReport Ends here
            // if (!this.isNew) {
                let taggs = [];
            if (this.strike.countries.hasOwnProperty('attackers')) {
                for (let i = 0; i < this.strike.countries.attackers.length; i++) {
                strikeAttackers.push(
                    new FormGroup({
                        country: new FormControl(this.strike.countries.attackers[i].country, Validators.required),
                        probability: new FormControl(this.strike.countries.attackers[i].probability)
                    })
                );
                }
            };
            if (this.strike.countries.hasOwnProperty('targets')) {
                for (let i = 0; i < this.strike.countries.targets.length; i++) {
                strikeTargets.push(
                    new FormGroup({
                        country: new FormControl(this.strike.countries.targets[i].country, Validators.required),
                        region: new FormControl(this.strike.countries.targets[i].region),
                        division: new FormControl(this.strike.countries.targets[i].division),
                        subdivision: new FormControl(this.strike.countries.targets[i].subdivision),
                        locale: new FormControl(this.strike.countries.targets[i].locale)
                    })
                );
                }
            }
            if (this.strike.type.hasOwnProperty('weaponTypes')) {
                for (let i = 0; i < this.strike.type.weaponTypes.length; i++) {
                    weaponTypes.push(
                            new FormGroup({
                                'clear': new FormControl(this.strike.type.weaponTypes[i].clear, Validators.required),
                                'term': new FormControl(this.strike.type.weaponTypes[i].term, Validators.required)
                            })
                            
                    );
                }
            };
            if (this.strike.type.hasOwnProperty('actionTypes')) {
                for (let i = 0; i < this.strike.type.actionTypes.length; i++) {
                    actionTypes.push(
                            new FormGroup({
                                'clear': new FormControl(this.strike.type.actionTypes[i].clear, Validators.required),
                                'term': new FormControl(this.strike.type.actionTypes[i].term, Validators.required)
                            })
                            
                    );
                }
            };
            if (this.strike.hasOwnProperty('objects')) {
                for (let i = 0; i < this.strike.objects.length; i++) {
                    Objects.push(
                            new FormGroup({
                                'type': new FormControl(this.strike.objects[i].type, Validators.required),
                                'clear': new FormControl(this.strike.objects[i].clear, Validators.required),
                                'stationary': new FormControl(this.strike.objects[i].stationary, Validators.required)
                            })
                            
                    );
                }
            };
            if (this.strike.hasOwnProperty('group')) {
                for (let i = 0; i < this.strike.objects.length; i++) {
                    Groups.push(
                            new FormGroup({
                        
                                'name': new FormControl(this.strike.group[i].name),
                                'clear': new FormControl(this.strike.group[i].clear)
                            })
                            
                    );
                }
            };
            if (this.strike.hasOwnProperty('people')) {
                for (let i = 0; i < this.strike.people.length; i++) {
                    Peoples.push(
                            new FormGroup({
                             
                                'name': new FormControl(this.strike.people[i].name),
                                'status': new FormControl(this.strike.people[i].status),
                                'clear': new FormControl(this.strike.people[i].clear)
                            })
                            
                    );
                }
            };

            if (this.strike.hasOwnProperty('details')) {
                for (let i = 0; i < this.strike.details.length; i++) {
                    strikeSummary.push(
                        new FormControl(this.strike.details[i], Validators.required)
                    );
                }
            };
            if (this.strike.hasOwnProperty('sources')) {
        
                for (let i = 0; i < this.strike.sources.length; i++) {
                    
                    if (this.strike.sources[i].hasOwnProperty('tags')) {
                    
                    
                        for (let tagIndex = 0; tagIndex < this.strike.sources[i].tags.length; tagIndex++) {
                  
                            strikeTags.push(
                                    new FormControl(this.strike.sources[i].tags[tagIndex], Validators.required),
                            );
                        }
                     
                    };
                    if (this.strike.sources[i].mainReport.hasOwnProperty('sources')) {
                        for (let sourceTypeIndex = 0; sourceTypeIndex < this.strike.sources[i].mainReport.sources.length; sourceTypeIndex++) {
                            sourceTypeTags.push(
                                    new FormControl(this.strike.sources[i].mainReport.sources[sourceTypeIndex], Validators.required),
                            );
                        }
                        
                    };
                    if (this.strike.sources[i].mainReport.hasOwnProperty('target')) {
                        targetTypeDetails = this.strike.sources[i].mainReport.target.targetTypeDetails;
                        additionalTargetDetails = this.strike.sources[i].mainReport.target.additionalDetails;
                        location = this.strike.sources[i].mainReport.target.location;
                        targetType = this.strike.sources[i].mainReport.target.targetType;
                        time = this.strike.sources[i].mainReport.target.time;
                    };
                    if (this.strike.sources[i].mainReport.hasOwnProperty('killed')) {
                        killedStatus = this.strike.sources[i].mainReport.killed.status;
                        additionalKilledDetails = this.strike.sources[i].mainReport.killed.additionalDetails;
                    };
        
                    if (this.strike.sources[i].mainReport.weapons.hasOwnProperty('terms')) {
                        for (let weaponTypeIndex = 0; weaponTypeIndex < this.strike.sources[i].mainReport.weapons.length; weaponTypeIndex++) {
                            weaponTypeTags.push(
                                    new FormControl(this.strike.sources[i].mainReport.weapons.terms[weaponTypeIndex], Validators.required)
                            );
                        }
                        ambigWeapon = this.strike.sources[i].mainReport.weapons.ambiguous;

                    };
                    if (this.strike.sources[i].mainReport.hasOwnProperty('casualties')) {
                        sourceTotal = this.strike.sources[i].mainReport.casualties.totals;
                        sourceSusMils = this.strike.sources[i].mainReport.casualties.susMils;
                        sourceCiv = this.strike.sources[i].mainReport.casualties.civilians;
                        sourceUnk = this.strike.sources[i].mainReport.casualties.unknowns;
                        sourceHvts = this.strike.sources[i].mainReport.casualties.hvts;
                        sourceChil = this.strike.sources[i].mainReport.casualties.children;

                    };
     
                    strikeSources.push(
                            new FormGroup({
                                title: new FormControl(this.strike.sources[i].title, Validators.required),
                                link: new FormControl(this.strike.sources[i].link),
                                altLink: new FormControl(this.strike.sources[i].altLink),
                                pubDate: new FormControl(moment(this.strike.sources[i].pubDate).format('YYYY-MM-DD')),
                                countStatistics: new FormControl(this.strike.sources[i].countStatistics),
                                tags: strikeTags,
                                mainReport:new FormGroup({
                                    sources:sourceTypeTags,
                                    target:new FormGroup({
                                        targetTypeDetails: new FormControl(targetTypeDetails),
                                        additionalDetails: new FormControl(additionalTargetDetails),
                                        location: new FormControl(location),
                                        targetType: new FormControl(targetType),
                                        time: new FormControl(time)
                                    }),
                                    killed:new FormGroup({
                                        status: new FormControl(killedStatus),
                                        additionalDetails: new FormControl(additionalKilledDetails)
                                    }),
                                    casualties:new FormGroup({
                                        totals: new FormControl(sourceTotal),
                                        susMils: new FormControl(sourceSusMils),
                                        civilians: new FormControl(sourceCiv),
                                        unknowns: new FormControl(sourceUnk),
                                        hvts: new FormControl(sourceHvts),
                                        children: new FormControl(sourceChil)
                                    }),
                                    weapons:new FormGroup({
                                        terms: weaponTypeTags,
                                        ambiguous: new FormControl(ambigWeapon)
                                    })
                                })
                            })
                        );
                }  
            };
                
            strike_id = this.strike._id;
            strikeDate = moment.utc(this.strike.date).format('YYYY-MM-DD');
            strikeTime = this.strike.time;
            strikeStateStatus = this.strike.stateStatus;
            stikeCount = this.strike.numStrikes;
            peopleReported = this.strike.peopleReported;
            groupReported = this.strike.groupReported;
            strikeReviewed = this.strike.reviewed;
            extended = this.strike.extended;
            onBorder = this.strike.onBorder;
            strikeTotal = this.strike.casualties.totals;
            strikeSusMils = this.strike.casualties.susMils;
            strikeCiv = this.strike.casualties.civilians;
            strikeUnk = this.strike.casualties.unknowns;
            strikeHvts = this.strike.casualties.hvts;
            strikeChil = this.strike.casualties.children;
            // }
            this.updateForm = this.fb.group({
                '_id':[strike_id],
                'date': [strikeDate],
                'time': [strikeTime],
                'stateStatus': [strikeStateStatus],
                'reviewed': [strikeReviewed],
                'numStrikes': [stikeCount],
                'extended': [false],
                'onBorder': [false],
                'countries':this.fb.group({
                    'attackers':strikeAttackers,
                    'targets':strikeTargets
                }),
                'type': this.fb.group({
                    weaponTypes: weaponTypes,
                    actionTypes: actionTypes
                }),
                'objects': Objects,
                'groupReported': [groupReported],
                'peopleReported': [peopleReported],
                'group': Groups,
                'people': Peoples,
                'casualties': this.fb.group({
                    'totals': strikeTotal,
                    'susMils': strikeSusMils,
                    'civilians': strikeCiv,
                    'unknowns': strikeUnk,
                    'hvts': strikeHvts,
                    'children': strikeChil
                }),
                'details': strikeSummary,
                'sources':strikeSources
            });
    }

	//Get, Push & Delete Attacker
    get attackers(): FormArray { return this.updateForm.get('countries.attackers') as FormArray; }
    addAttacker() { this.attackers.push(
					new FormGroup({
						'country': new FormControl(null, Validators.required),
						'probability': new FormControl(null)
					})
				); }
    removeAttacker(i: number) { this.attackers.removeAt(i); }


	//Get, Push & Delete Attacker
    get targets(): FormArray { return this.updateForm.get('countries.targets') as FormArray; }
    addTarget() { this.targets.push(
					 new FormGroup({
						'country': new FormControl(null, Validators.required),
						'region': new FormControl(null),
						'division': new FormControl(null),
						'subdivision': new FormControl(null),
						'locale': new FormControl(null)
					})
				); }
    removeTarget(i: number) { this.targets.removeAt(i); }

    //Get, Push & Delete Sources
    get weapons(): FormArray { return this.updateForm.get('type.weaponTypes') as FormArray; }
    addWeapon() { this.weapons.push(
                        new FormGroup({
                            'clear': new FormControl(false, Validators.required),
                            'term': new FormControl(null, Validators.required)
                        })
                    ); }
    removeWeapon(i: number) { this.weapons.removeAt(i); }

  get actions(): FormArray { return this.updateForm.get('type.actionTypes') as FormArray; }
  addAction() { this.actions.push(
                        new FormGroup({
                            'clear': new FormControl(false, Validators.required),
                            'term': new FormControl(null, Validators.required)
                        })
                    ); }
  removeAction(i: number) { this.actions.removeAt(i); }

  get objects(): FormArray { return this.updateForm.get('objects') as FormArray; }
  addObject() { this.objects.push(
                        new FormGroup({
                            'type': new FormControl(null, Validators.required),
                            'clear': new FormControl(false, Validators.required),
                            'stationary': new FormControl(null, Validators.required)
                        })
                    ); }
  removeObject(i: number) { this.objects.removeAt(i); }

  get groups(): FormArray { return this.updateForm.get('group') as FormArray; }
  addGroup() { this.groups.push(
                        new FormGroup({
              
                            'name': new FormControl(null),
                            'clear': new FormControl(false)
                        })
                    ); }
  removeGroup(i: number) { this.groups.removeAt(i); }

  get people(): FormArray { return this.updateForm.get('people') as FormArray; }
  addPerson() { this.people.push(
                        new FormGroup({
                         
                            'name': new FormControl(null),
                            'status': new FormControl(this.selectedStatus),
                            'clear': new FormControl(false)
                        })
                    ); }
  removePerson(i: number) { this.people.removeAt(i); }

  get details(): FormArray { return this.updateForm.get('details') as FormArray; }
  addDetail() { this.details.push(
                        new FormControl(null, Validators.required)
                    ); }
  removeDetail(i: number) { this.details.removeAt(i); }
  get sources(): FormArray { return this.updateForm.get('sources') as FormArray; }
  addSource() { this.sources.push(
                            new FormGroup({
                                'title': new FormControl(null, Validators.required),
                                'link': new FormControl(null,  Validators.required),
                                'altLink': new FormControl(null),
                                'pubDate': new FormControl(this.formattedDate,  Validators.required),
                                'countStatistics': new FormControl(false,  Validators.required),
                                'tags': new FormArray([
                                    new FormControl(null, Validators.required)
                                ]),
                                'mainReport':  new FormGroup({
                                    'casualties':  new FormGroup({
                                        'totals': new FormControl(null),
                                        'susMils': new FormControl(null),
                                        'civilians': new FormControl(null),
                                        'unknowns': new FormControl(null),
                                        'hvts': new FormControl(null),
                                        'children': new FormControl(null)
                                    }),
                                    'sources': new FormArray([
                                        new FormControl(null)
                                    ]),
                                    'target':  new FormGroup({
                                        'targetTypeDetails': new FormControl(null),
                                        'additionalDetails': new FormControl(null),
                                        'location': new FormControl(null),
                                        'targetType': new FormControl(null),
                                        'time': new FormControl(null)
                                    }),
                                    'killed': new FormGroup({
                                        'status':  new FormControl(null, Validators.required),
                                        'additionalDetails':  new FormControl(null)
                                    }),
                                    'weapons': new FormGroup({
                                        'terms': new FormArray([
                                            new FormControl(null)
                                        ]),
                                        'ambiguous': new FormControl(false)
                                    })
                                    
                                })
                                
                                
                            })
                    ); }
  removeSource(i: number) { this.sources.removeAt(i); }
  // navigate to people-list page
    gotoStrikes() { this.router.navigate(['/admin/operations']); }


     goTo(location: string): void {
        window.location.hash = location;
    }

    // submit values to create data
    onSubmit(value: any){
        console.log(value)
        this.strikeService.updateStrike(value)
        .subscribe(
            data =>  alert('Data successfully added!'),
            error => console.error("Error updating strike!"),
            ()=>  {
                this.done =true;
                this.router.navigate(['/admin/operations']);
            }
        );
    }
    // unsubscribe to prevent memory leaks
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    canDeactivate():  Observable<boolean> | boolean {
      if(!this.done){
          return confirm(this.help.leave);
      }
      return true
    }
}
