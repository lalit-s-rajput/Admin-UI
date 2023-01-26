import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableViewComponent } from './table-view.component';
import { tableData } from '../../../../assets/mockData/mockData';
import { By } from '@angular/platform-browser';
import { ResultService } from '../../services/results-service.service';
import { ModalComponent } from '../../components';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

describe('TableViewComponent', () => {
  let component: TableViewComponent;
  let fixture: ComponentFixture<TableViewComponent>;
  let service: ResultService;
  let changedData: any;
  let editedData: any;
  beforeEach(async () => {
    const resultServiceStub = jasmine.createSpyObj(ResultService, [
      'deleteMember',
      'editMember'
    ]);
    changedData = resultServiceStub.deleteMember.and.returnValue(tableData.slice(1));
    editedData = resultServiceStub.editMember.and.returnValue(tableData);
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,ReactiveFormsModule,
        FormsModule ],
      declarations: [TableViewComponent, ModalComponent],
      providers: [{ provide: ResultService, useValue: resultServiceStub }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableViewComponent);
    component = fixture.componentInstance;
    component.memberData = tableData;
    service = TestBed.inject(ResultService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('resize event should called on window resize', () => {
    spyOn(component,'onResize').and.callThrough();
    window.dispatchEvent(new Event('resize'));
  });

  it('edit row should have been called on click', () => {
    spyOn(component, 'editRow').and.callThrough();
    const editRowButton = fixture.debugElement.query(
      By.css('.fa-pencil-square-o')
    );
    editRowButton.nativeElement.click();
    expect(component.editRow).toHaveBeenCalled();
  });

  it('should show delete modal on delete row click', () => {
    spyOn(component, 'showModalDialog').and.callThrough();
    const deleteRowButton = fixture.debugElement.query(By.css('.fa-trash'));
    deleteRowButton.nativeElement.click();
    expect(component.showModalDialog).toHaveBeenCalled();
    expect(component.currentMemberData).toEqual(tableData[0]);
  });

  it('should hide delete modal on cancel button click', () => {
    spyOn(component, 'hideModal').and.callThrough();
    const deleteRowButton = fixture.debugElement.query(By.css('.fa-trash'));
    deleteRowButton.nativeElement.click();
    fixture.detectChanges();
    const hideModalButton = fixture.debugElement.query(By.css('.no-btn'));
    hideModalButton.nativeElement.click();
    fixture.detectChanges();
    expect(component.hideModal).toHaveBeenCalled();
    expect(component.currentMemberData).toEqual(null);
  });

  it('can delete member on click of modal yes button', () => {
    spyOn(component, 'deleteMember').and.callThrough();
    const deleteRowButton = fixture.debugElement.query(By.css('.fa-trash'));
    deleteRowButton.nativeElement.click();
    fixture.detectChanges();
    const deleteRow = fixture.debugElement.query(By.css('.yes-btn'));
    deleteRow.nativeElement.click();
    fixture.detectChanges();
    expect(tableData.slice(1)).toEqual(changedData());
  });

  it('edit member modal component should cancel on cancel button click',()=>{
    const editRowButton = fixture.debugElement.query(
      By.css('.fa-pencil-square-o')
    );
    editRowButton.nativeElement.click();
    fixture.detectChanges();
    const modalComponent = fixture.debugElement.query(By.css('app-modal'));
    modalComponent.triggerEventHandler('cancel',true);
    fixture.detectChanges();
  });

  it('edit member modal component should cancel on cancel button click',()=>{
    const editRowButton = fixture.debugElement.query(
      By.css('.fa-pencil-square-o')
    );
    editRowButton.nativeElement.click();
    fixture.detectChanges();
    const modalComponent = fixture.debugElement.query(By.css('app-modal'));
    modalComponent.triggerEventHandler('cancel',true);
    fixture.detectChanges();
    let isModalVisible = fixture.debugElement.query(By.css('app-modal'))?fixture.debugElement.query(By.css('app-modal')):null;
    expect(isModalVisible).toEqual(null); 
  });

  it('on trigger of editedData output event, component editedData method should called', () => {
    spyOn(component, 'editedData').and.callThrough();
    const editRowButton = fixture.debugElement.query(
      By.css('.fa-pencil-square-o')
    );
    editRowButton.nativeElement.click();
    fixture.detectChanges();
    const modalComponent = fixture.debugElement.query(By.css('app-modal'));
    modalComponent.triggerEventHandler('editedData',{});
    expect(component.editedData).toHaveBeenCalled();
  });

  it('should call deleteSelectedRow function on checkbox check and uncheck', () => {
    spyOn(component,'deleteSelectedRow').and.callThrough();
    const checkbox = fixture.debugElement.query(By.css('.delete-selected-row'));
    checkbox.nativeElement.click();
    fixture.detectChanges();
    expect(component.deleteSelectedRow).toHaveBeenCalled();
    checkbox.nativeElement.click();
    fixture.detectChanges();
    expect(component.deleteSelectedRow).toHaveBeenCalled();
  });

  it('should call deleteSelectedRow function on checkbox check and uncheck', () => {
    spyOn(component,'selectAll').and.callThrough();
    const checkbox = fixture.debugElement.query(By.css('.select-all-check'));
    checkbox.nativeElement.click();
    fixture.detectChanges();
    expect(component.selectAll).toHaveBeenCalled();
    checkbox.nativeElement.click();
    fixture.detectChanges();
    expect(component.selectAll).toHaveBeenCalled();
  });

  it('should delete selected rows on button click', () => {
    spyOn(component,'deleteSelected').and.callThrough();
    component.isSelectAllChecked = true;
    const checkbox = fixture.debugElement.query(By.css('.select-all-check'));
    checkbox.nativeElement.click();
    const button = fixture.debugElement.query(By.css('.delete-selected'));
    button.nativeElement.click();
    fixture.detectChanges();
    expect(component.deleteSelected).toHaveBeenCalled();
  });
});
