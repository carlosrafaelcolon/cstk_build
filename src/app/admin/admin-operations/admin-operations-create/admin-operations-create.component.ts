import { Component, OnInit} from '@angular/core';
import { Router }              from '@angular/router';
import {FormGroup, FormControl, FormArray, Validators, FormBuilder} from '@angular/forms';
import {StrikeService, Strike, HelperService } from '../../../shared';
import {ComponentCanDeactivate} from '../../user-edit.guard';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import * as moment from 'moment';
@Component({
  selector: 'app-admin-operations-create',
  templateUrl: './admin-operations-create.component.html'
})
export class AdminOperationsCreateComponent implements OnInit, ComponentCanDeactivate{
    today = new Date().toJSON();
    formattedDate = moment.utc(this.today).format('YYYY-MM-DD');
    postForm: FormGroup;
    done = false;
    targetedCountrySelections;
    attackingCountrySelections;
    weaponSelections;
    actionSelections;
    objectSelections;
    statusSelections;
    stateStatusSelections;
    timeSelections;


    selectedTargetedCountry;
    selectedAttacker;
    selectedWeapon;
    selectedAction;
    selectedObject;
    selectedStatus;
    selectedStateStatus;
    selectedTime;
    constructor(
        private router: Router,
        private help:HelperService,
        private strikeService: StrikeService,
        private fb:FormBuilder){}

    ngOnInit(){
        // Attacked
        this.targetedCountrySelections = this.strikeService.targetedCountrySelection;
        this.selectedTargetedCountry = this.targetedCountrySelections[0].value;
        //attackers
        this.attackingCountrySelections = this.strikeService.attackingCountrySelection;
        this.selectedAttacker = this.attackingCountrySelections[0].value;
        //weapons
        this.weaponSelections = this.strikeService.weaponSelection;
        this.selectedWeapon = this.weaponSelections[0].value;
        //actions
        this.actionSelections = this.strikeService.actionSelection;
        this.selectedAction = this.actionSelections[0].value;
        //objects
        this.objectSelections = this.strikeService.objectSelection;
        this.selectedObject = this.objectSelections[0].value;

        //status
        this.statusSelections = this.strikeService.statusSelection;
        this.selectedStatus = this.statusSelections[0].value;

        //state status
        this.stateStatusSelections = this.strikeService.stateStatus;
        this.selectedStateStatus = this.stateStatusSelections[0].value;

        //time
        this.timeSelections = this.strikeService.time;
        this.selectedTime = this.timeSelections[0].value;

        // Initializing Route Param Data
        this.initForm();
    }
    goTo(location: string): void {
        window.location.hash = location;

    }
    canDeactivate():  Observable<boolean> | boolean {
    if(!this.done){
        return confirm(this.help.leave);
    }
    return true
  }
    // function for this.initForm found in ngOnInit section
    // function for this.initForm found in ngOnInit section
    private initForm() {

        this.postForm = this.fb.group({
            'date': [this.formattedDate],
            'time': [this.selectedTime],
            'numStrikes': [null],
            'stateStatus': [this.selectedStateStatus],
            'reviewed': [false],
            'extended': [false],
            'onBorder': [false],
            'countries':this.fb.group({
                'attackers':this.fb.array([
					this.fb.group({
						'country': [this.selectedAttacker, Validators.required],
						'probability': [null]
					})
				]),
                'targets':this.fb.array([
					this.fb.group({
						'country': [this.selectedTargetedCountry, Validators.required],
						'region': [null],
						'division': [null],
						'subdivision': [null],
						'locale': [null]
					})
				])
            }),
            type: this.fb.group({
				weaponTypes: this.fb.array([
					this.fb.group({
						term: [this.selectedWeapon],
						clear: [false]
					})
				]),
				actionTypes: this.fb.array([
					this.fb.group({
						term: [this.selectedAction],
						clear: [false]
					})
				]),
			}),
			objects: this.fb.array([
				// this.fb.group({
				// 	type: [null],
				// 	stationary:[null],
				// 	clear:[null]
				// })
			]),
            groupReported: [false, Validators.required],
			group: this.fb.array([
				//  this.fb.group({
               
				// 	name: [null],
				// 	clear:[null]
				// })
			]),
            peopleReported: [false, Validators.required],
			people: this.fb.array([
				// this.fb.group({
				// 	name: [null],
				// 	status:[null],
				// 	clear:[null]
				// })
			]),
            'casualties': this.fb.group({
                'totals': [null, Validators.required],
                'susMils': [null, Validators.required],
                'civilians': [null, Validators.required],
                'unknowns': [null, Validators.required],
                'hvts': [null, Validators.required],
                'children': [null, Validators.required]
            }),
            'details': this.fb.array([
					[null, Validators.required]
				]),
            'sources':this.fb.array([
				this.fb.group({
					'title': [null, Validators.required],
					'link': [null, Validators.required],
					'altLink': [null],
					'pubDate': [this.formattedDate],
					'countStatistics': [false],
					'tags': this.fb.array([
						[null]
					]),
					mainReport: this.fb.group({
						'casualties': this.fb.group({
							'totals':  [null],
							'susMils':  [null],
							'civilians':  [null],
							'unknowns':  [null],
							'hvts':  [null],
							'children':  [null]
						}),
						'sources': this.fb.array([
							// [null, Validators.required]
						]),
						'target': this.fb.group({
							'targetTypeDetails':  [null],
							'additionalDetails':  [null],
							'location':  [null],
							'targetType':  [null],
							'time':  [null],
						}),
						'killed': this.fb.group({
							'status': [null],
							'additionalDetails': [null]
						}),
						'weapons': this.fb.group({
                            'terms': this.fb.array([
                                [null]
                            ]),
                            'ambiguous': [false]
							})
                        
					})
				})
			])
        });
    }

    
    onSubmit(value:any) {
    console.log(value)
      this.strikeService.addStrike(value)
        .subscribe(
            data =>  alert('Data successfully added!!!'),
            error => alert("Error adding strike!"),
            ()=>  {
                this.done =true;
                this.router.navigate(['/admin/operations']);
            }
        );
 
  }
	gotoStrikes() {
		this.router.navigate(['/admin/operations']); 
	}
	//Get, Push & Delete Attacker
    get attackers(): FormArray { return this.postForm.get('countries.attackers') as FormArray; }
    addAttacker() { this.attackers.push(
					new FormGroup({
						'country': new FormControl(this.selectedAttacker, Validators.required),
						'probability': new FormControl(null)
					})
				); }
    removeAttacker(i: number) { this.attackers.removeAt(i); }


	//Get, Push & Delete Attacker
    get targets(): FormArray { return this.postForm.get('countries.targets') as FormArray; }
    addTarget() { this.targets.push(
					 new FormGroup({
						'country': new FormControl(this.selectedTargetedCountry, Validators.required),
						'region': new FormControl(null),
						'division': new FormControl(null),
						'subdivision': new FormControl(null),
						'locale': new FormControl(null)
					})
				); }
    removeTarget(i: number) { this.targets.removeAt(i); }

    //Get, Push & Delete Sources
    get weapons(): FormArray { return this.postForm.get('type.weaponTypes') as FormArray; }
    addWeapon() { this.weapons.push(
                        new FormGroup({
                            'clear': new FormControl(false, Validators.required),
                            'term': new FormControl(this.selectedWeapon, Validators.required)
                        })
                    ); }
    removeWeapon(i: number) { this.weapons.removeAt(i); }

  get actions(): FormArray { return this.postForm.get('type.actionTypes') as FormArray; }
  addAction() { this.actions.push(
                        new FormGroup({
                            'clear': new FormControl(false, Validators.required),
                            'term': new FormControl(this.selectedAction, Validators.required)
                        })
                    ); }
  removeAction(i: number) { this.actions.removeAt(i); }

  get objects(): FormArray { return this.postForm.get('objects') as FormArray; }
  addObject() { this.objects.push(
                        new FormGroup({
                            'type': new FormControl(this.selectedObject, Validators.required),
                            'clear': new FormControl(false, Validators.required),
                            'stationary': new FormControl(false, Validators.required)
                        })
                    ); }
  removeObject(i: number) { this.objects.removeAt(i); }

  get groups(): FormArray { return this.postForm.get('group') as FormArray; }
  addGroup() { this.groups.push(
                        new FormGroup({
     
                            'name': new FormControl(null),
                            'clear': new FormControl(false)
                        })
                    ); }
  removeGroup(i: number) { this.groups.removeAt(i); }

  get people(): FormArray { return this.postForm.get('people') as FormArray; }
  addPerson() { this.people.push(
                        new FormGroup({
                            'name': new FormControl(null),
                            'status': new FormControl(this.selectedStatus),
                            'clear': new FormControl(false)
                        })
                    ); }
  removePerson(i: number) { this.people.removeAt(i); }

  get details(): FormArray { return this.postForm.get('details') as FormArray; }
  addDetail() { this.details.push(
                        new FormControl(null, Validators.required)
                    ); }
  removeDetail(i: number) { this.details.removeAt(i); }

  get sources(): FormArray { return this.postForm.get('sources') as FormArray; }
  addSource() { this.sources.push(
                            new FormGroup({
                                'title': new FormControl(null, Validators.required),
                                'link': new FormControl(null,  Validators.required),
                                'altLink': new FormControl(null),
                                'pubDate': new FormControl(this.formattedDate, Validators.required),
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
                                            new FormControl(null, Validators.required)
                                        ]),
                                        'ambiguous': new FormControl(false, Validators.required)
                                    })
                                    
                                })
                                
                                
                            })
                    ); }
  removeSource(i: number) { this.sources.removeAt(i); }
  
}
