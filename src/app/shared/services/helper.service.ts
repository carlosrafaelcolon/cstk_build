import { Injectable } from '@angular/core';
import { Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class HelperService {

  constructor() { }
  	options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone:'UTC' };
	noWeekday = {  year: 'numeric', month: 'long', day: 'numeric', timeZone:'UTC' };
	shortOptions = {  year: 'numeric', month: 'short', day: 'numeric', timeZone:'UTC' };
	trial = {  year: 'numeric', month: 'short', day: 'numeric'};
  	//Helpers
	leave = "Do you want to leave? If YES click 'OK'"
	public extractData(res: Response) {
		let body = res.json();
		return body || { };
	}
	public extractABC(res: Response) {
		let body = res.json().sort((a,b) => a.name.localeCompare(b.name));
		return body || { };
	}
	public handleError (error: Response | any) {
			// In a real world app, we might use a remote logging infrastructure
			let errMsg: string;
			if (error instanceof Response) {
			const body = error.json() || '';
			const err = body.error || JSON.stringify(body);
			errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
			} else {
			errMsg = error.message ? error.message : error.toString();
			}
			console.error(errMsg);
			return Observable.throw(errMsg);
	}
}
