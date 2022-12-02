import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
  @Input() noOfItems = 10;
  _dataLength = 0;
  @Input() set dataLength(data: any) {
    if (data) {
      this._dataLength = data;
      this.setData();
    }
  }
  nextPageCount = 0;
  noOfPages: any;
  maxRowCount = 1;
  rowCount = 1;
  itemsToBeShown: any;
  disableFurtherNext = false;
  disableNextRow = false;
  currentEndPageIndex = 0;
  constructor() {}

  ngOnInit(): void {}

  setData() {
    if (this._dataLength) {
      this.noOfPages = new Array(Math.ceil(this._dataLength / this.noOfItems)); // 10 = 100/10
      this.itemsToBeShown = new Array(this.noOfPages.length);
      this.maxRowCount = Math.floor(this.noOfPages.length / this.noOfItems);
      this.currentEndPageIndex = this.noOfPages.length - 1;
    }
  }

  furtherNext() {
    this.currentEndPageIndex++;
    if (this.currentEndPageIndex >= this.noOfPages.length) {
      this.currentEndPageIndex = this.noOfPages.length - 1;
      this.disableFurtherNext = true;
      this.disableNextRow = true;
      return;
    }
    this.nextPageCount = this.currentEndPageIndex - (this.noOfItems - 1);
    this.noOfPages = new Array(Math.ceil(this._dataLength / this.noOfItems));
  }

  furtherBack() {
    this.nextPageCount--;
    this.disableFurtherNext = false;
    this.disableNextRow = false;
    this.currentEndPageIndex = this.nextPageCount + (this.noOfItems - 1);
    this.noOfPages = new Array(Math.ceil(this._dataLength / this.noOfItems));
  }

  moveToNextRow() {
    this.currentEndPageIndex = this.currentEndPageIndex + (this.noOfItems - 1);
    if (this.currentEndPageIndex > this.noOfPages.length) {
      this.currentEndPageIndex = this.noOfPages.length - 1;
      this.disableNextRow = true;
      this.disableFurtherNext = true;
    }
    this.nextPageCount = this.currentEndPageIndex - (this.noOfItems - 1);
    this.noOfPages = new Array(Math.ceil(this._dataLength / this.noOfItems));
  }

  backToPreviousRow() {
    this.nextPageCount = this.nextPageCount - (this.noOfItems - 1);
    if (this.nextPageCount <= 0) {
      this.nextPageCount = 0;
      this.currentEndPageIndex = this.nextPageCount + (this.noOfItems - 1);
    }
    this.disableFurtherNext = false;
    this.disableNextRow = false;
    this.noOfPages = new Array(Math.ceil(this._dataLength / this.noOfItems));
  }

  pageClick(index: any) {
    console.log(index);
  }
}
