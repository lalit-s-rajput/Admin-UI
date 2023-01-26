import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResultService } from '../../services/results-service.service';
import { ResultsContainerComponent } from './results-container.component';
import { tableData } from '../../../../assets/mockData/mockData';
import { of } from 'rxjs';
import { PaginationComponent, SearchBarComponent } from '../../components';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
describe('ResultsContainerComponent', () => {
  let component: ResultsContainerComponent;
  let fixture: ComponentFixture<ResultsContainerComponent>;
  let service: ResultService;
  let dataToShow:any = [];
  beforeEach(async () => {
    const resultServiceStub = jasmine.createSpyObj('ResultService', [
      'getData',
      'filterData'
    ]);
    dataToShow = resultServiceStub.getData.and.returnValue(of(tableData));
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ResultsContainerComponent,SearchBarComponent,PaginationComponent],
      providers: [{ provide: ResultService, useValue: resultServiceStub }],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsContainerComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(ResultService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('component should initialize with data',()=>{
    expect(component._tableData).toEqual(tableData);
  });

  it('renders search component',()=>{
    const searchComponent = fixture.debugElement.query(By.css('app-search-bar'));
    expect(searchComponent).toBeTruthy();
  });

  it('renders pagination component',()=>{
    const paginationComponent = fixture.debugElement.query(By.css('app-pagination'));
    expect(paginationComponent).toBeTruthy();
  });

  it('listens to pagination component change',()=>{
    spyOn(component,'pageNumber').and.callThrough();
    const paginationComponent = fixture.debugElement.query(By.css('app-pagination'));
    paginationComponent.triggerEventHandler('pageNumber',0);
    expect(component.pageNumber).toHaveBeenCalled();
  });

  it('listens to search component change',()=>{
    spyOn(component,'searchData').and.callThrough();
    const searchComponent = fixture.debugElement.query(By.css('app-search-bar'));
    searchComponent.triggerEventHandler('searchKey','test');
    expect(component.searchData).toHaveBeenCalled();
  });

  it('should call resize event',()=>{
    spyOn(component,'onResize').and.callThrough();
    window.dispatchEvent(new Event('resize'));
    expect(component.onResize).toHaveBeenCalled();
  });
});
