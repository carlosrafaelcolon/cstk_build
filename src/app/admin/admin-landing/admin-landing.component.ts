import { Component} from '@angular/core';
import { Router }              from '@angular/router';
import {AuthService } from '../../shared';
@Component({
  selector: 'app-admin-landing',
  templateUrl: './admin-landing.component.html'
})
export class AdminLandingComponent  {
 
  constructor(
    private authService:AuthService,
    private router: Router
  ) { }

  ngOnInit() {
 
  }
   gotoLibrary() {
    let link = ['/admin/library'];
    this.router.navigate(link);
  }
  gotoStrikes() {
    let link = ['/admin/operations'];
    this.router.navigate(link);
  }
   gotoPeople() {
    let link = ['/admin/people'];
    this.router.navigate(link);
  }
  gotoBlog() {
    let link = ['/admin/blog'];
    this.router.navigate(link);
  }

}
