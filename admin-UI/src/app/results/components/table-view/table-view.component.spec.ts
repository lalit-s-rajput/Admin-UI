import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableViewComponent } from './table-view.component';
import { tableData } from '../../../../assets/mockData/mockData';
import { By } from '@angular/platform-browser';
import { ResultService } from '../../services/results-service.service';
import { ModalComponent } from '../../components';

describe('TableViewComponent', () => {
  let component: TableViewComponent;
  let fixture: ComponentFixture<TableViewComponent>;
  let service: ResultService;
  let changedData: any;
  beforeEach(async () => {
    const resultServiceStub = jasmine.createSpyObj(ResultService, [
      'deleteMember',
    ]);
    changedData = resultServiceStub.deleteMember.and.returnValue(tableData.slice(1));
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [TableViewComponent],
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

  it('modal component',()=>{
    const editRowButton = fixture.debugElement.query(
      By.css('.fa-pencil-square-o')
    );
    editRowButton.nativeElement.click();
    fixture.detectChanges();
  });
});
