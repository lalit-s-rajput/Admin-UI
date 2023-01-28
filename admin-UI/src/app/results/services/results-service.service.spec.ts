import { TestBed } from '@angular/core/testing';

import { ResultService } from './results-service.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { tableData } from '../../../assets/mockData/mockData';
import { of } from 'rxjs';
describe('ResultsServiceService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: ResultService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let returnData: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ResultService],
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    returnData = httpClientSpy.get.and.returnValue(of(tableData));
    service = TestBed.inject(ResultService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('correct data should return on get data', () => {
    let obsData = service.getData();
    const request = httpTestingController.expectOne(
      'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json'
    );
    request.flush(tableData);
    expect(obsData.value).toEqual(service.membersList.value);
    expect(obsData.value).toEqual(service.filteredList.value);
  });

  it('error should be thrown on 500 error', () => {
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404, statusText: 'Not Found'
    });
    returnData = httpClientSpy.get.and.returnValue(of(errorResponse));
    let obsData = service.getData();
    const status = 500;
    const statusText = 'Internal Server Error';
    const errorEvent = new ErrorEvent('API error');
    /* … */
    const request = httpTestingController.expectOne('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json');
    request.error(errorEvent, { status, statusText });
    expect(service.filteredList.value.length).toEqual(0);
  });

  it('should delete member method should return correct value', () => {
    service.filteredList.next(tableData);
    service.deleteMember(['1']);
    expect(service.filteredList.value).toEqual(tableData.slice(1));
  });

  it('should emit correct value on edit member method', () => {
    service.filteredList.next([...tableData]);
    let dataToBeModified = { id: '1', name: 'test', email: 'test', role: 'test' };
    service.editMember(dataToBeModified);
    expect(service.filteredList.value[0]).toEqual(dataToBeModified);
  });

  it('should filter data on provided key', () => {
    service.membersList.next(tableData);
    let key = 'aaro';
    service.filterData(key);
    expect(service.filteredList.value.length).toEqual(1);
  });

  it('should return original data on blank key provided', () => {
    service.membersList.next(tableData);
    let key = '';
    service.filterData(key);
    expect(service.filteredList.value.length).toEqual(service.membersList.value.length);
  });
});
