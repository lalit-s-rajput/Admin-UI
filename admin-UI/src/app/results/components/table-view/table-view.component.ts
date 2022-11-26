import { Component, OnInit } from '@angular/core';
import { Results } from 'src/app/core/interface/results';
import { ResultService } from '../../services/results-service.service';
@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss']
})
export class TableViewComponent implements OnInit {
  memberData:any;
  currentMemberData:any = null;
  currentEditMemberData:any = null;
  showModal = false;
  showEditModal = false;
  constructor(private resultService:ResultService) { }

  ngOnInit(): void {
    this.memberData = this.resultService.getData();
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
