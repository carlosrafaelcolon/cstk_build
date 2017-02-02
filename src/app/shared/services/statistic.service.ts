export interface strikeStatistics {
  
  totals?: { min: number, max: number,avg: number; sum: number; values:Array<number>};
  susMils?: { min: number, max: number,avg: number; sum: number; values:Array<number>};
  civilians?: { min: number, max: number,avg: number; sum: number; values:Array<number>};
  unknowns?: { min: number, max: number,avg: number; sum: number; values:Array<number>};
  counter?: number;
}



export interface basicStats {
  numStrikes?: number;
  totals?: { avg: number; sum: number; values:Array<number>};
  susMils?: { avg: number; sum: number; values:Array<number>};
  civilians?: { avg: number; sum: number; values:Array<number>};
  unknowns?: { avg: number; sum: number; values:Array<number>};
}


import { Injectable } from '@angular/core';

@Injectable()
export class StatisticService {

  constructor() { }
    buildStatsArray(statObj, rawObj, rawObjProps) {
        rawObjProps.forEach( (prop) => {
            let curProp = Number(rawObj[prop]);
            if (!isNaN(curProp)) {
                statObj[prop] = statObj[prop] || {};
                statObj[prop].values.push(curProp);
            }
        });
        statObj.counter = !isNaN(Number(statObj.counter)) ? statObj.counter + 1 : 1;
    };

    calculateRanges(curObj) {
        curObj.min = Math.min.apply(Math, curObj.values);
        curObj.max = Math.max.apply(Math, curObj.values);
    };

    calculateAverage(counter, curObj) {
          curObj.sum = 0, curObj.avg = 0;
          if (!!counter) {
              curObj.sum = curObj.values.reduce( (currentSum, val) => {
                  currentSum += val;
                  return currentSum;
              }, 0);
              curObj.avg = (curObj.sum / counter).toFixed(2);
          }
      };
}
