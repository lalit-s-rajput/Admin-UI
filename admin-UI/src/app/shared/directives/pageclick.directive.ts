import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appPageclick]'
})
export class PageclickDirective {
  // private el:ElementRef
  constructor() {
   }
  //  @HostListener('click') onclick(){
  //   this.el.nativeElement.classList.add('disable-btn');
  //  }

}
