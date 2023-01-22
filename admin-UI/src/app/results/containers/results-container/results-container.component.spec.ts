import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResultService } from '../../services/results-service.service';
import { ResultsContainerComponent } from './results-container.component';

describe('ResultsContainerComponent', () => {
  let component: ResultsContainerComponent;
  let fixture: ComponentFixture<ResultsContainerComponent>;
  let service: ResultService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      declarations: [ ResultsContainerComponent ],
      providers:[ResultService]
    })
    .compileComponents();
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
});
