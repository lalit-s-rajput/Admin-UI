import { Component, OnInit } from '@angular/core';
import { ResultService } from '../../services/results-service.service';

@Component({
  selector: 'app-results-container',
  templateUrl: './results-container.component.html',
  styleUrls: ['./results-container.component.scss']
})
export class ResultsContainerComponent implements OnInit {
  memberData:any;
  constructor(private resultService:ResultService) { }

  ngOnInit(): void {
    // change here
    this.memberData = this.resultService.getData();
  }
  searchData(data:string){
    this.resultService.filterData(data.toLowerCase());
  }
}
