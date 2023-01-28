import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { ModalComponent } from './modal.component';
import { tableData } from '../../../../assets/mockData/mockData';
describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalComponent ],
      providers:[FormBuilder]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    component.modalData = null;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should emit cancel event', () => {
  //   spyOn(component,'emitCancel').and.callFake(()=>{});
  //   component.modalData = null;
  //   const cancelButton = fixture.debugElement.query(By.css('.no-btn'));
  //   cancelButton.nativeElement.click();
  //   fixture.detectChanges();
  //   expect(component.emitCancel).toHaveBeenCalled();
  // });
});
