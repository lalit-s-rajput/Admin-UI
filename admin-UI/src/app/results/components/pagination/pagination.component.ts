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
      this.currentEndPageIndex = this.noOfItems-1;
    }
  }

  furtherNext() {
    if (this.nextPageCount + this.noOfItems < this.noOfPages.length) {
      this.currentEndPageIndex++;
      this.disableFurtherNext = false;
      this.nextPageCount++;
      this.noOfPages = new Array(Math.ceil(this.dataLength / this.noOfItems));
    }else{
      this.disableFurtherNext = true;
      this.disableNextRow = true;
    }
  }

  furtherBack() {
    if(this.nextPageCount){
      this.currentEndPageIndex--;
      this.disableFurtherNext = false;
      this.disableNextRow = false;
      this.nextPageCount--;
      this.noOfPages = new Array(Math.ceil(this.dataLength / this.noOfItems));
    }
  }

  moveToNextRow() {
    if (this.rowCount < this.maxRowCount) {
      this.rowCount++;
      this.currentEndPageIndex +=9; 
      this.nextPageCount += 9;
      this.noOfPages = new Array(Math.ceil(this.dataLength / this.noOfItems));
    }else{
      this.nextPageCount=this.noOfPages.length-this.nextPageCount-1;
      this.noOfPages = new Array(Math.ceil(this.dataLength / this.noOfItems));
      this.disableNextRow = (this.currentEndPageIndex<this.noOfPages.length)?false:true;
    }
  }

  backToPreviousRow() {
    this.nextPageCount -= 9;
    this.noOfPages = new Array(Math.ceil(this.dataLength / this.noOfItems));
  }

  pageClick(index: any) {
    console.log(index);
  }
}
