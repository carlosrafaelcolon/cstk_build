import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterLibrary',
  pure:false
})
export class FilterLibraryPipe implements PipeTransform {

  transform(publications: any, themes?:any, topics?:any, countries?:any, title?: any, authors?:any): any {
    // *********************************************************
    // Reset Variables
    // *********************************************************
    let themeNull = (themes === undefined ||  themes == ''  ||  themes === null ||  themes === 'null');
    let topicNull = (topics === undefined ||  topics == ''  ||  topics === null ||  topics === 'null');

    let countryNull = (countries === undefined ||  countries == ''  ||  countries === null ||  countries === 'null');

    let titleNull = (title === undefined ||  title == ''  ||  title === null);
    let authorNull = (authors === undefined || authors == '' ||  authors === null);

    //********************************************************
   


    // check if search terms are undefined or equal to 0
    if (themeNull && topicNull && countryNull  && titleNull && authorNull ) {return publications;} 


     // check if themes is selected but others are undefined or equal to 0
    else if (themes && topicNull && countryNull && titleNull && authorNull) {
      return publications.filter( 
          value => value.themes.toString().toLowerCase().includes(themes.toLowerCase()) );
    }


    // check if topics is selected but others are undefined or equal to 0
    else if (topics && themeNull && countryNull && titleNull && authorNull) {
      return publications.filter( 
          value => value.topics.toString().toLowerCase().includes(topics.toLowerCase()) );
    }

    // check if countries are selected but others are undefined or equal to 0
    else if (countries && topicNull && themeNull && titleNull && authorNull) {
      return publications.filter( 
          value => value.topics.toString().toLowerCase().includes(countries.toLowerCase()) );
    }

    // check if title is selected but others are undefined or equal to 0
    else if (title && themeNull && topicNull && countryNull && authorNull) {
      return publications.filter( 
            (value) => value.title.toLowerCase().includes(title.toLowerCase())
          );
    }

    // check if authors is selected but others are undefined or equal to 0
    else if (authors && titleNull && themeNull && topicNull && countryNull ) {
          return publications.filter( 
          value => value.authors.toString().toLowerCase().includes(authors.toLowerCase()) );
    }

    // check if themes & topics are selected but others are undefined or equal to 0
    else if (themes && topics && countryNull && titleNull && authorNull) {
      return publications.filter( 
          value => value.themes.toString().toLowerCase().includes(themes.toLowerCase()) 
                    && value.topics.toString().toLowerCase().includes(topics.toLowerCase())
          
          );
    }
    // check if themes, topics & countries are selected but others are undefined or equal to 0
    else if (themes && topics && countries && titleNull && authorNull) {
      return publications.filter( 
          value => value.themes.toString().toLowerCase().includes(themes.toLowerCase()) 
                    && value.topics.toString().toLowerCase().includes(topics.toLowerCase() && countries.toLowerCase() )
          
          );
    }

    // check if themes, topics, countries & title are selected but others are undefined or equal to 0
    else if (themes && topics && countries && title && authorNull) {
      return publications.filter( 
          value => value.themes.toString().toLowerCase().includes(themes.toLowerCase()) 
                    && value.topics.toString().toLowerCase().includes(topics.toLowerCase() && countries.toLowerCase() )
                      &&  value.title.toLowerCase().includes(title.toLowerCase())
          
          );
    }

    // check if topics & countries are selected but others are undefined or equal to 0
    else if (topics && countries && themeNull && titleNull && authorNull) {
      return publications.filter( 
          value =>  value.topics.toString().toLowerCase().includes(topics.toLowerCase() && countries.toLowerCase() )
          
          );
    }
    // check if topics & title are selected but others are undefined or equal to 0
    else if (topics && title && countryNull && themeNull  && authorNull) {
      return publications.filter( 
          value =>  value.topics.toString().toLowerCase().includes(topics.toLowerCase())
                        && value.title.toLowerCase().includes(title.toLowerCase())
          
          );
    }

    // check if topics & authors are selected but others are undefined or equal to 0
    else if (topics && authors && titleNull && countryNull && themeNull ) {
      return publications.filter( 
          value =>  value.topics.toString().toLowerCase().includes(topics.toLowerCase())
                        && value.authors.toString().toLowerCase().includes(authors.toLowerCase())
          
          );
    }

    // check if countries & title are selected but others are undefined or equal to 0
    else if (countries && title && topicNull && themeNull  && authorNull) {
      return publications.filter( 
          value =>  value.topics.toString().toLowerCase().includes(countries.toLowerCase())
                        && value.title.toLowerCase().includes(title.toLowerCase())
          );
    }

    // check if countries & authors are selected but others are undefined or equal to 0
    else if (countries && title && topicNull && themeNull  && authorNull) {
      return publications.filter( 
          value =>  value.topics.toString().toLowerCase().includes(countries.toLowerCase())
                        && value.authors.toString().toLowerCase().includes(authors.toLowerCase())
          );
    }

    // check if all are selected 
    else if (themes && topics && countries && title && authors) {
      return publications.filter( 
          value => value.themes.toString().toLowerCase().includes(themes.toLowerCase()) 
                    && value.topics.toString().toLowerCase().includes(topics.toLowerCase() && countries.toLowerCase() )
                      &&  value.title.toLowerCase().includes(title.toLowerCase())
                          && value.authors.toString().toLowerCase().includes(authors.toLowerCase())
          
          );
    }
 
      
  }

}
