import { Component,  Input } from '@angular/core';
import {FormGroup, FormControl, FormArray, Validators, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-weapon-types',
  templateUrl: './weapon-types.component.html'
})
export class WeaponTypesComponent  {

  @Input('weapons')  weaponForm: FormGroup;

  //Get, Push & Delete Sources
  get weapons(): FormArray { return this.weaponForm.get('weapons.terms') as FormArray; }
  addWeaponType() { this.weapons.push(
                        new FormControl('', Validators.required)
                    ); }
  removeWeaponType(weaponFormIndex: number) { this.weapons.removeAt(weaponFormIndex); }
  constructor() { }


}
