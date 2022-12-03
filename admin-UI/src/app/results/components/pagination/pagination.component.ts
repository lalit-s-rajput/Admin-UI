import {
  Component,
  OnInit,
  Input,
  Output,
  ViewChildren,
  QueryList,
  ElementRef,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
  @Input() noOfItems = 10;
  lastClickedIndex = 0;
  @ViewChildren('pageClickRef') pageClickDir: QueryList<ElementRef> | undefined;
  pageClickRefArr: any = [];
  _dataLength = 0;
  @Input() set dataLength(data: any) {
    if (data) {
      this._dataLength = data;
      this.setData();
    }
  }
  @Output() pageNumber = new EventEmitter<number>();
  nextPageCount = 0;
  noOfPages: any;
  itemsToBeShown: any;
  disableFurtherNext = false;
  disableNextRow = false;
  currentEndPageIndex = 0;
  constructor() {}

  ngOnInit(): void {}

  setData() {
    if (this._dataLength) {
      this.noOfPages = new Array(Math.ceil(this._dataLength / this.noOfItems)); // 10 = 100/10
      this.itemsToBeShown =
        this.noOfPages.length < 10
          ? new Array(this.noOfPages.length)
          : new Array(10);
      this.currentEndPageIndex =
        this.noOfPages.length < 10
          ? this.noOfPages.length - 1
          : this.itemsToBeShown.length - 1;

      if (this.currentEndPageIndex >= this.noOfPages.length - 1) {
        this.currentEndPageIndex = this.noOfPages.length - 1;
        this.disableFurtherNext = true;
        this.disableNextRow = true;
        // return;
      }
      setTimeout(()=>{
        this.pageClickRefArr = this.pageClickDir?.toArray();
        this.pageClickRefArr[0].nativeElement.classList.add('disable-btn');
      });
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
    if (!this.pageClickRefArr.length) {
      this.pageClickRefArr = this.pageClickDir?.toArray();
    }
    this.pageClickRefArr[index].nativeElement.classList.add('disable-btn');
    this.pageClickRefArr[this.lastClickedIndex].nativeElement.classList.remove('disable-btn');
    this.lastClickedIndex = index;
    this.pageNumber.emit(this.lastClickedIndex);
  }
}
