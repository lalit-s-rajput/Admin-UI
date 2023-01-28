import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { SearchBarComponent } from './search-bar.component';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchBarComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call changedData in input keyup event', () => {
    spyOn(component, 'changeData').and.callThrough();
    const inputField = fixture.debugElement.query(
      By.css('.search-input-field')
    );
    const event = new KeyboardEvent('keyup', {
      bubbles: true,
      cancelable: true,
      shiftKey: true,
    });
    inputField.nativeElement.value = 'test';
    inputField.nativeElement.dispatchEvent(event);
    fixture.detectChanges();
    expect(component.changeData).toHaveBeenCalled();
  });
});
