import {
  Component,
  OnInit,
  Input,
  ViewChildren,
  QueryList,
  ElementRef,
  ViewChild,
  HostListener,
} from '@angular/core';
import { Results } from 'src/app/core/interface/results';
import { ResultService } from '../../services/results-service.service';
@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss'],
})
export class TableViewComponent implements OnInit {
  _memberData: any = [];
  _tableData: any = [];
  deleteRowIDArray: any = [];
  currentMemberData: any = null;
  currentEditMemberData: any = null;
  showModal = false;
  showEditModal = false;
  isSelectAllChecked = false;
  isMobileScreen = false;
  @HostListener('window:resize', ['$event'])
  onResize(event?: any) {
    this.isMobileScreen = event?.currentTarget?.outerWidth < 479 ? true : false;
  }
  @ViewChildren('inputCheck') inputCheckList: QueryList<ElementRef> | undefined;
  @ViewChild('selectAllCheck') inputSelectAll: any;
  @ViewChild('selectAllMobileCheck') selectAllMobileCheck: any;
  @Input() set memberData(data: any) {
    this._tableData = data;
  }
  constructor(private resultService: ResultService) {}

  ngOnInit(): void {
    this.isMobileScreen = window.innerWidth < 479 ? true : false;
  }

  // isMobileScreenChanged() {}

  editRow(item: Results) {
    this.showEditModal = true;
    this.currentEditMemberData = item;
  }
  showModalDialog(item: Results) {
    this.showModal = true;
    this.currentMemberData = item;
  }
  hideModal() {
    this.showModal = false;
    this.currentMemberData = null;
  }
  deleteMember() {
    if (this.currentMemberData) {
      this.resultService.deleteMember([this.currentMemberData.id]);
      this.hideModal();
    }
  }
  hideEditModal(flag: boolean) {
    this.showEditModal = false;
  }
  editedData(data: any) {
    this.resultService.editMember(data);
  }
  selectAll(event: any) {
    this.isSelectAllChecked = event.currentTarget.checked;
    this.inputCheckList?.toArray().forEach((element) => {
      element.nativeElement.checked = this.isSelectAllChecked ? true : false;
      element.nativeElement.parentElement.parentElement.style.backgroundColor =
        this.isSelectAllChecked ? 'lightGray' : 'transparent';
    });
    if (this.isSelectAllChecked) {
      this._tableData.forEach((item: Results) => {
        this.deleteRowIDArray.push(item.id);
      });
    } else {
      this.deleteRowIDArray = [];
    }
  }
  deleteSelectedRow(event: any, item: Results) {
    if (event.currentTarget.checked) {
      this.deleteRowIDArray.push(item.id);
      event.currentTarget.parentElement.parentElement.style.backgroundColor =
        'lightGray';
    } else {
      event.currentTarget.parentElement.parentElement.style.backgroundColor =
        'transparent';
      this.deleteRowIDArray = this.deleteRowIDArray.filter((member: string) => {
        return item.id !== member;
      });
    }
  }
  deleteSelected() {
    this.resultService.deleteMember(this.deleteRowIDArray);
    if (this.isSelectAllChecked) {
      this.isSelectAllChecked = false;
      if(this.inputSelectAll?.nativeElement?.checked){
        this.inputSelectAll.nativeElement.checked = false;
      }
      if(this.selectAllMobileCheck?.nativeElement?.checked){
        this.selectAllMobileCheck.nativeElement.checked = false;
      }
    }
  }
}
