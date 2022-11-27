import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
  @Input() noOfItems = 10;
  @Input() dataLength = 0;
  nextPageCount = 0;
  noOfPages: any;
  maxRowCount = 1;
  rowCount = 1;
  itemsToBeShown: any;
  disableFurtherNext = false;
  disableNextRow = false;
  currentEndPageIndex = 0;
  constructor() {}

  ngOnInit(): void {
    if (this.dataLength) {
      this.itemsToBeShown = new Array(10);
      this.noOfPages = new Array(Math.ceil(this.dataLength / this.noOfItems)); // 10 = 100/10
      this.maxRowCount = Math.floor(this.noOfPages.length / this.noOfItems);
      this.currentEndPageIndex = this.noOfItems - 1;
    }
  }

  furtherNext() {
    this.currentEndPageIndex++;
    if (this.currentEndPageIndex > this.noOfPages.length) {
      this.currentEndPageIndex = this.noOfPages.length - 1;
      this.disableFurtherNext = true;
      this.disableNextRow = true;
    }
    this.nextPageCount = this.currentEndPageIndex - (this.noOfItems - 1);
    this.noOfPages = new Array(Math.ceil(this.dataLength / this.noOfItems));
  }

  furtherBack() {
    this.nextPageCount--;
    this.disableFurtherNext = false;
    this.disableNextRow = false;
    this.currentEndPageIndex = this.nextPageCount + (this.noOfItems - 1);
    this.noOfPages = new Array(Math.ceil(this.dataLength / this.noOfItems));
  }

  moveToNextRow() {
    this.currentEndPageIndex = this.currentEndPageIndex + (this.noOfItems - 1);
    if (this.currentEndPageIndex > this.noOfPages.length) {
      this.currentEndPageIndex = this.noOfPages.length - 1;
      this.disableNextRow = true;
      this.disableFurtherNext = true;
    }
    this.nextPageCount = this.currentEndPageIndex - (this.noOfItems - 1);
    this.noOfPages = new Array(Math.ceil(this.dataLength / this.noOfItems));
  }

  backToPreviousRow() {
    this.nextPageCount = this.nextPageCount - (this.noOfItems - 1);
    if (this.nextPageCount <= 0) {
      this.nextPageCount = 0;
      this.currentEndPageIndex = this.nextPageCount + (this.noOfItems - 1);
    }
    this.disableFurtherNext = false;
    this.disableNextRow = false;
    this.noOfPages = new Array(Math.ceil(this.dataLength / this.noOfItems));
  }

  pageClick(index: any) {
    console.log(index);
  }
}
