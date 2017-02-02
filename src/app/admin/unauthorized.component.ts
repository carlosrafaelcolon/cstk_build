import { Component } from '@angular/core';
import { Router} from '@angular/router';
@Component({
  selector: 'app-unauthorized',
  templateUrl: './unauthorized.component.html'
})
export class UnauthorizedComponent  {

  constructor( public router: Router) { }
  goBack(){
		this.router.navigate(["/admin"]);
	}


}
