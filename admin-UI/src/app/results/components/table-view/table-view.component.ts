import { Component, OnInit, Input } from '@angular/core';
import { Results } from 'src/app/core/interface/results';
import { ResultService } from '../../services/results-service.service';
@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss']
})
export class TableViewComponent implements OnInit {
  _memberData:any = [];
  _tableData:any = [];
  currentMemberData:any = null;
  currentEditMemberData:any = null;
  showModal = false;
  showEditModal = false;
  @Input() set memberData(data:any){
      if(data.length){
        this._tableData = data;
      }
  }
  constructor(private resultService:ResultService) { }

  ngOnInit(): void {
  }

  editRow(item:Results){
    this.showEditModal = true;
    this.currentEditMemberData = item;
  }
  showModalDialog(item:Results){
    this.showModal = true;
    this.currentMemberData = item;
  }
  hideModal(){
    this.showModal = false;
    this.currentMemberData = null;
  }
  deleteMember(){
    if(this.currentMemberData){
      this.resultService.deleteMember(this.currentMemberData);
      this.hideModal();
    }
  }
  hideEditModal(flag:boolean){
    this.showEditModal = false;
  }
  editedData(data:any){
    console.log(data);
  }
}
