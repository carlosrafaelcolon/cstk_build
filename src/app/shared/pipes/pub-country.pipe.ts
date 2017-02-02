import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pubCountry'
})
export class PubCountryPipe implements PipeTransform {

  transform(publications: any, topics?: any): any {
    if (topics)  {
      return publications.filter( 
          value => value.topics.toString().toLowerCase().includes(topics.toLowerCase()) );
    }
  }

}
