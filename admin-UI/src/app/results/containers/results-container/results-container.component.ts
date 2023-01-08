import { Component, HostListener, OnInit } from '@angular/core';
import { ResultService } from '../../services/results-service.service';

@Component({
  selector: 'app-results-container',
  templateUrl: './results-container.component.html',
  styleUrls: ['./results-container.component.scss']
})
export class ResultsContainerComponent implements OnInit {
  memberData:any;
  _tableData:any = [];
  originalDataLength:number = 0;
  isMobileScreen = false;
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isMobileScreen = (event?.currentTarget?.outerWidth<479) ? true : false;
  }
  constructor(private resultService:ResultService) { }

  ngOnInit(): void {
    // change here
    this.isMobileScreen = window.innerWidth < 479 ? true : false;
    this.resultService.getData().subscribe((data)=>{
      this._tableData = data;
      this.originalDataLength = data.length;
      this.setTableData(this._tableData,0);
    });
  }
  searchData(data:string){
    this.resultService.filterData(data.toLowerCase());
  }

  pageNumber(pageNumber:number){
    this.setTableData(this._tableData,pageNumber);
  }
  setTableData(wholeDataset:any,pageNumber:number){
    this.memberData = wholeDataset.slice(pageNumber*10,(pageNumber+1)*10);
  }
}
