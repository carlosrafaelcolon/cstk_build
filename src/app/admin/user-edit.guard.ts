import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';

export interface ComponentCanDeactivate {
    canDeactivate(): any;
}

export class UserEditGuard implements CanDeactivate<any> {
    canDeactivate(component:ComponentCanDeactivate): Observable<boolean> | boolean {
        return component.canDeactivate ? component.canDeactivate() : true ;
    }
}
