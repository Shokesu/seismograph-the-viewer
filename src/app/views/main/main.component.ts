import { Component, OnInit } from '@angular/core';

import { CandidatesService } from '../../services/candidates//candidates.service';
import { VizCategoriesService } from '../../services/viz-categories/viz-categories.service';
import { ModesService } from '../../services/modes/modes.service';
import { Candidate } from '../../classes/candidate';
import { VizCategory } from '../../classes/viz-category';
import { Mode } from '../../classes/mode';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  public candidates: Candidate[];
  public vizCategories: VizCategory[];
  public modes: Mode[];
  public showBy: String;

  constructor(private candidatesService: CandidatesService,
              private vizCategoriesServices: VizCategoriesService,
  			      private modesServices: ModesService,
              ) { }

  ngOnInit() {
  	  this.candidatesService.getCandidates().subscribe(
  		  candidates => this.candidates = candidates
      )
      
      this.vizCategoriesServices.getVizCategories().subscribe(
        vizCategories => this.vizCategories = vizCategories
      )      
      this.modesServices.getModes().subscribe(
        modes => this.modes = modes
      )

  }

  changeMode($event){
    this.showBy =  $event.showMode
  }

}
