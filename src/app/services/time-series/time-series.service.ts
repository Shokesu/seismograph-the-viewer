import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { TimeSerie } from '../../classes/time-serie';
import { VizCategory } from '../../classes/viz-category';
import { Candidate } from '../../classes/candidate';

@Injectable()
export class TimeSeriesService {

  constructor(
    private http: HttpClient,
  ) { }

  getData ():Observable<any>{
  	return this.http.get("assets/data/time-series.json")
  }

  getSeries(data:any, metric:string, candidates:Candidate[],  themes:VizCategory[], showBy:string){
    if(showBy == 'candidate')
      return themes.map((theme)=>this.getSingleSerie(data, theme, candidates[0], showBy) )
    if(showBy == 'theme')
      return candidates.map((candidate)=>this.getSingleSerie(data, themes[0], candidate, showBy) )
  }

  private getSingleSerie(data:any, theme:VizCategory, candidate:Candidate, showBy:string):TimeSerie{
    let dates = data[theme.id][candidate.id].dates;
  	let values = data[theme.id][candidate.id].values;
  	let key = showBy == 'theme'?candidate.name:theme.name
  	return {'values': dates.map((date,index)=> ({'x': new Date(date),'y': +values[index] })),
  			    'key': key}  
  }
  
} 

