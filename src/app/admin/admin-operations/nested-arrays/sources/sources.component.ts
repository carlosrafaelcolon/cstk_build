import { Component,  Input } from '@angular/core';
import {FormGroup, FormControl, FormArray, Validators, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-sources',
  templateUrl: './sources.component.html'
})
export class SourcesComponent {

  @Input('sources')  sourceForm: FormGroup;

  //Get, Push & Delete Sources
  get sources(): FormArray { return this.sourceForm.get('sources') as FormArray; }
  addSourceType() { this.sources.push(new FormControl('', Validators.required)); }
  removeSourceType(sourceIndex: number) { this.sources.removeAt(sourceIndex); }
  constructor() { }


}
