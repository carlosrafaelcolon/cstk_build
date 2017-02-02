import { Component, Input } from '@angular/core';
import {FormGroup, FormControl, FormArray, Validators, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html'
})
export class TagsComponent {
  @Input('tags')  tagForm: FormGroup;

  //Get, Push & Delete Themes
  get tags(): FormArray { return this.tagForm.get('tags') as FormArray; }
  addTag() { this.tags.push(new FormControl('', Validators.required)); }
  removeTag(tagFormIndex: number) { this.tags.removeAt(tagFormIndex); }
  constructor() { }


}
