import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { PaginationComponent } from './pagination.component';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    component.dataLength = 106;
    component.noOfItems = 10;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('resize event should called on window resize', () => {
    spyOn(component,'onResize').and.callThrough();
    window.dispatchEvent(new Event('resize'));
    expect(component.onResize).toHaveBeenCalled();
  });

  it('should disable pagination button once click', () => {
    spyOn(component, 'pageClick').and.callThrough();
    const editRowButton = fixture.debugElement.queryAll(
      By.css('.pag-btn-active')
    );
    editRowButton[2].nativeElement.click();
    fixture.detectChanges();
    expect(component.pageClick).toHaveBeenCalled();
    expect(editRowButton[2].nativeElement.classList.contains('disable-btn')).toEqual(true);
    expect(editRowButton[0].nativeElement.classList.contains('disable-btn')).toEqual(false);
  });

  it('should move to next page on next page button click',()=>{
    spyOn(component,'furtherNext').and.callThrough();
    const furtherNextButton = fixture.debugElement.query(
      By.css('.further-next')
    );
    furtherNextButton.nativeElement.click();
    fixture.detectChanges();
    // last page clicked test
    expect(component.furtherNext).toHaveBeenCalled();
    furtherNextButton.nativeElement.click();
    fixture.detectChanges();
    expect(component.disableFurtherNext).toBeTruthy();
    expect(component.disableNextRow).toBeTruthy();
  });

  it('should show next set of buttons on next-row button click',()=>{
    spyOn(component,'moveToNextRow').and.callThrough();
    const furtherNextRowButton = fixture.debugElement.query(
      By.css('.move-to-next-row')
    );
    furtherNextRowButton.nativeElement.click();
    fixture.detectChanges();
    expect(component.moveToNextRow).toHaveBeenCalled();
  });

  it('should move to prev page on prev-page button click',()=>{
    spyOn(component,'furtherBack').and.callThrough();
    const furtherBackButton = fixture.debugElement.query(
      By.css('.further-back')
    );
    const furtherNextButton = fixture.debugElement.query(
      By.css('.further-next')
    );
    furtherNextButton.nativeElement.click();
    fixture.detectChanges();
    furtherBackButton.nativeElement.click();
    fixture.detectChanges();
    expect(component.furtherBack).toHaveBeenCalled();
  });

  it('should show prev set of buttons on prev-row button click',()=>{
    component.dataLength = 206;
    component.noOfItems = 10;
    fixture.detectChanges();
    spyOn(component,'backToPreviousRow').and.callThrough();
    const backToPreviousRowButton = fixture.debugElement.query(
      By.css('.back-row')
    );
    const furtherNextRowButton = fixture.debugElement.query(
      By.css('.move-to-next-row')
    );
    furtherNextRowButton.nativeElement.click();
    fixture.detectChanges();
    backToPreviousRowButton.nativeElement.click();
    fixture.detectChanges();
    expect(component.backToPreviousRow).toHaveBeenCalled();
  });
});
